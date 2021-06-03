new Vue({
  el: '#app',
  data() {
    return {
      isPaused: true,
      result: 0,
      results: [],
      interval: null,
      limit: '12',
      cards: [
        { 
          name: 'bull', 
          src: './img/bull.svg',
          isActive: false,
        },
        { 
          name: 'butterfly', 
          src: './img/butterfly.svg',
          isActive: false, 
        },
        { 
          name: 'cat', 
          src: './img/cat.svg',
          isActive: false, 
        },
        { 
          name: 'crab', 
          src: './img/crab.svg',
          isActive: false,
        },
        { 
          name: 'lion', 
          src: './img/lion.svg',
          isActive: false, 
        },
        { 
          name: 'monkey', 
          src: './img/monkey.svg',
          isActive: false,
        },
        { 
          name: 'polar-bear', 
          src: './img/polar-bear.svg',
          isActive: false,
        },
          { 
            name: 'scorpion', 
            src: './img/scorpion.svg',
            isActive: false, 
          },
          { 
            name: 'snake', 
            src: './img/snake.svg',
            isActive: false,
          },
          { 
            name: 'swan', 
            src: './img/swan.svg',
            isActive: false,
          },
          { 
            name: 'turtle', 
            src: './img/turtle.svg',
            isActive: false,
          },
          { 
            name: 'wolf-head', 
            src: './img/wolf-head.svg',
            isActive: false, 
          },
        ],
        last: null,
        current: null,
      }
    },
    computed: {
      passed() { 
        return this.cards.filter(card => !!card && !!card.isActive) 
      },
      isWinner() {
        return this.passed.filter(card => !!card).length - this.limit === 0
      },
      bestResult() {
        return Math.min(...this.results) | '--'
      }
    },
    mounted() {
      let {cards} = this
      // cards.splice(0, --limit)
      const DOMcards = document.querySelectorAll('div.card')
      DOMcards.forEach((element, index) => {
        const random = Math.floor(Math.random() * (DOMcards.length - 0 + 1)) + 0
        element.id = `card_${index}`
        element.style.order = random
      });
    },
    methods: {
      cardClicker(val, event) {
        // let {last, current} = this
        let target = event.currentTarget
        if (!!this.current && this.current.id === target.id || this.isPaused) return 
        target.classList.toggle("hide")
        this.last = this.current
        this.current = {
          id: target.id,
          name: val.name,
        }
        if (!!this.last && this.last.name === this.current.name) {
          this.cards.find(card => card.name === this.current.name).isActive = true
          this.current = null
          this.last = null
        } else if (!!this.last) {
          const buffer = { 
            current: this.current, 
            last: this.last
          }
          setTimeout(() => {
            document.getElementById(buffer.last.id).classList.add("hide")
            document.getElementById(buffer.current.id).classList.add("hide")
          }, 500)
          this.current = null
          this.last = null
        }
      },
      getTime(ms) {
        const dt = new Date(ms);
        function addZ(n) {
          return (n<10? '0':'') + n;
        }
        // const hrs = dt.getHours();
        const mins = dt.getMinutes();
        const secs = dt.getSeconds();
        const millis = dt.getMilliseconds();
        
        return  addZ(mins) + ':' + addZ(secs) + "." + Math.floor(millis / 100);
      },
      winnerClicker() {
        this.cards.map(card => card.isActive = false)
        this.result = 0
        this.interval = setInterval(() => this.result += 100, 100)
      },
    },
    watch: {
      isPaused() {
        !this.isPaused
        ? this.interval = setInterval(() => this.result += 100, 100)
        : clearInterval(this.interval)
      },
      isWinner() {
        if (!!this.isWinner) {
          clearInterval(this.interval)
          this.results.push(this.result)
        }
      },
      limit() {
        const DOMcards = document.querySelectorAll('div.card')
        const container = document.getElementById('container')
        this.result = 0
        this.results = []
        this.isPaused = true
        DOMcards.forEach((element, index) => {
          element.classList.add('hide')
          element.classList.remove('active')
        });
        switch(this.limit) {
          case '12': 
          container.className = 'large'
          break;
          case '8': 
          container.className = 'medium'
          break;
          case '6': 
          container.className = 'small'
          break;
        }
      }
    }
  })