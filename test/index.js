import expect from 'expect'
import superagent from 'supertest'

import { app } from '../build/index'
import NameGenerator from '../build/generator'

describe('Testing \'Project Names\'', () => {

  describe('Testing server', () => {

    it('Should return a string', (done) => {
      superagent(app)
        .get('/names')
        .expect(200)
        .end((err, res) => {
          expect(res.text).toBeA('string')
          done()
        })
    })

    it('Should return 2 words and 1 number by default', (done) => {
      superagent(app)
        .get('/names')
        .expect(200)
        .end((err, res) => {
          expect(res.text.split('-').length).toEqual(3)
          done()
        })
    })

    it('Should return raw word list', (done) => {
      superagent(app)
        .get('/names/raw')
        .expect(200)
        .end((err, res) => {
          expect(res.body.length).toEqual(3)
          done()
        })
    })

    it('Should return 5 words and 1 number', (done) => {
      superagent(app)
        .get('/names?words=5')
        .expect(200)
        .end((err, res) => {
          expect(res.text.split('-').length).toEqual(6)
          done()
        })
    })

    it('Should return 5 words and 1 number', (done) => {
      superagent(app)
        .get('/names?words=5')
        .expect(200)
        .end((err, res) => {
          expect(res.text.split('-').length).toEqual(6)
          done()
        })
    })

    it('Should return only 5 words', (done) => {
      superagent(app)
        .get('/names?words=5&numbered=false')
        .expect(200)
        .end((err, res) => {
          expect(res.text.split('-').length).toEqual(5)
          done()
        })
    })

    it('Should return a name with custom separator', (done) => {
      superagent(app)
        .get('/names?separator=$')
        .expect(200)
        .end((err, res) => {
          expect(res.text.split('$').length).toBeGreaterThan(0)
          done()
        })
    })

    it('Should return a list of names', (done) => {
      superagent(app)
        .get('/names/list?limit=10')
        .expect(200)
        .end((err, res) => {
          expect(res.body.length).toEqual(10)
          done()
        })
    })

    it('Should return a list of raw names', (done) => {
      superagent(app)
        .get('/names/list/raw?limit=10')
        .expect(200)
        .end((err, res) => {
          expect(res.body.length).toEqual(10)
          expect(res.body[0].length).toEqual(3)
          done()
        })
    })
  })

  describe('Testing generator', () => {

    it('Should return a string', () => {
      expect(NameGenerator.constructNames().joinNames()).toBeA('string')
    })

    it('Should return 2 words and 1 number', () => {
      const split = NameGenerator.constructNames().joinNames().split('-')
      expect(split[0]).toBeA('string')
      expect(split[1]).toBeA('string')
      expect(parseInt(split[2])).toBeA('number')
    })

    it('Should return raw string', () => {
      const names = NameGenerator.constructNames().rawNames()
      expect(names.length).toEqual(3)
    })

    it('Should return 5 words and 1 number', () => {
      const split = NameGenerator.constructNames(5).joinNames().split('-')
      expect(split.length).toEqual(6)
    })

    it('Should return only 5 words', () => {
      const split = NameGenerator.constructNames(5, false).joinNames().split('-')
      expect(split.length).toEqual(5)
    })

    it('Should return a string with custom separator', () => {
      const split = NameGenerator.constructNames().joinNames('$').split('$')
      expect(split.length).toEqual(3)
    })

    it('Should return a list of strings', () => {
      const names = NameGenerator.nameList(10)
      expect(names.length).toEqual(10)
    })

    it('Should return a list of raw strings', () => {
      const names = NameGenerator.nameListRaw(10, { words: 5 })
      expect(names[0].length).toEqual(6)
    })

  })
})
