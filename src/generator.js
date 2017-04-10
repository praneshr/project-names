import nouns from './nouns'
import adjectives from './adjectives'

class NameGenerator {

  constructor() {
    this.nounCount = nouns.length
    this.adjCount = adjectives.length
    this.names = []
  }

  // Private method
  getRandomNumberWithinLimit(maxLimit) {
    return Math.floor(Math.random() * (maxLimit - 0) + 0)
  }

  // Private method
  getRandomNoun() {
    const ranIndex = this.getRandomNumberWithinLimit(this.nounCount)
    const ranNoun = nouns[ranIndex]
    return ranNoun
  }

  // Private method
  getRandomAdj() {
    const ranIndex = this.getRandomNumberWithinLimit(this.adjCount)
    const ranAdj = adjectives[ranIndex]
    return ranAdj
  }

  constructNames(words = 2, numbered = true) {
    this.names = []
    for (const i = 0; i < (words < 10 ? words : 10); i++) {
      if (i === (words - 1)) {
        const ranNoun = this.getRandomNoun()
        this.names.push(ranNoun)
        if (numbered) {
          const largeRanNum = this.getRandomNumberWithinLimit(+new Date())
          const ranNum = largeRanNum.toString().split('').reverse().join('').slice(0, 5)
          this.names.push(ranNum)
        }
      } else {
        const ranAdj = this.getRandomAdj()
        this.names.push(ranAdj)
      }
    }
    return this
  }

  joinNames(separator = '-') {
    const names = this.names || []
    return names.join(separator)
  }

  nameList(limit, options = {}) {
    const { words, numbered, separator } = options
    const list = []
    for (const i = 0; i < limit; i++) {
      list.push(this.constructNames(words, numbered).joinNames(separator))
    }
    return list
  }

  nameListRaw(limit, options = {}) {
    const { words, numbered, separator } = options
    const list = []
    for (const i = 0; i < limit; i++) {
      list.push(this.constructNames(words, numbered).rawNames())
    }
    return list
  }

  rawNames() {
    return this.names
  }
}

export {
  NameGenerator,
}
export default new NameGenerator()