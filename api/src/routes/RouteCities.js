import { CODE_ROMES, CRITERIONS } from '../constants/criterion'
import { Types } from '../utils/types'
import Route from './Route'
import config from 'config'

export default class RouteCities extends Route {
  constructor(params) {
    super({ ...params, model: 'cities' })

    this.preloadSearch()
  }

  async preloadSearch() {
    if(config.preloadSearch) {
      console.log('PRELOAD SEARCH - Start')
      const regions = await this.model.regions()
      for(let i = 0; i < CODE_ROMES.length; i++) {
        const code = CODE_ROMES[i]
        console.log('PRELOAD SEARCH - Code rome ' + code.key)
        await this.model.search({codeRome: [code.key]})
        await this.model.search({codeRegion: regions.map(r => (r.id)), codeCriterion: CRITERIONS.map(c => (c.key)), codeRome: [code.key]})
      }
      console.log('PRELOAD SEARCH - Done')
    }
  }

  @Route.Get()
  async list(ctx) {
    this.sendOk(ctx, await this.model.findAll())
  }

  /**
   * @body {[int]} [code_region]
   * @body {[string]} [code_criterion]
   * @body {[string]} [code_rome]
   */
  @Route.Post({
    bodyType: Types.object().keys({
      code_region: Types.array().type(Types.number()),
      code_criterion: Types.array().type(Types.string()),
      code_rome: Types.array().type(Types.string()),
    }),
  })
  async search(ctx) {
    const {code_region: codeRegion, code_criterion: codeCriterion, code_rome: codeRome} = this.body(ctx)

    const result = await this.model.search({codeRegion, codeCriterion, codeRome})

    this.sendOk(ctx, result)
  }

  @Route.Get()
  async criterions(ctx) {
    this.sendOk(ctx, {criterions: CRITERIONS, regions: await this.model.regions(), codeRomes: CODE_ROMES})
  }

  @Route.Get({
    path: 'load/:insee',
  })
  async loadCity(ctx) {
    const {insee} = ctx.params
    const details = await this.model.getCity({insee})


    this.sendOk(ctx, details)
  }

  /**
   * @body {[number]} [latitude]
   * @body {[number]} [longitude]
   */
  @Route.Post({
    bodyType: Types.object().keys({
      latitude: Types.number().required(),
      longitude: Types.number().required(),
    }),
  })
  async searchByLocation(ctx) {
    const {latitude, longitude} = this.body(ctx)

    const result = await this.model.searchByLocation({latitude, longitude})

    this.sendOk(ctx, result)
  }

  /**
   * @body {[number]} [latitude]
   * @body {[number]} [longitude]
   */
  @Route.Post({
    bodyType: Types.object().keys({
      name: Types.string().required(),
    }),
  })
  async searchByName(ctx) {
    const {name} = this.body(ctx)

    const result = await this.model.searchByName({name})

    this.sendOk(ctx, result)
  }

}
