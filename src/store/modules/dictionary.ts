import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators'
import { getDictonarySelectData, getRefundDict } from '@/config/service/common'

import store from '@/store'

export interface IDictionary {
  dictMap: any
  refundDict: any
}

@Module({ dynamic: true, store, name: 'dictionary' })
class Dictionary extends VuexModule implements IDictionary {
  public dictMap = []
  public refundDict = {}

  @Mutation
  private SET_DictList(list: any) {
    this.dictMap = list
  }
  @Mutation
  private SET_RefundDict(list: any) {
    this.refundDict = list
  }

  @Action
  public async fetchDictionyList() {
    try {
      const data = await getDictonarySelectData()
      if (data.code == 200 && data.result) {
        this.SET_DictList(data.result)
      } else {
        this.SET_DictList([])
      }
    } catch (e) {
      console.log('获取字典接口失败', e)
    }
  }
  // 售后管理页面枚举
  @Action
  public async fetchRefundDict() {
    try {
      const data = await getRefundDict()

      if (data.code == 200 && data.result) {
        this.SET_RefundDict(data.result)
      } else {
        this.SET_RefundDict({})
      }
    } catch (e) {
      console.log('获取售后原因和审核原因失败', e)
    }
  }
}

export const DictionaryModule = getModule(Dictionary)
