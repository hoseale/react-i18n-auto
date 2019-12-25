import Serv from './homeServ';
import { observable, action, computed, configure, runInAction } from 'mobx';

// 严格模式
configure({enforceActions: 'always'})

class Mod {
  @observable
  count = 0

  @observable
  state={
    loading: false,
    list: []
  }

  @action
  increment() {
    this.count++
  }

  @action
  decrement() {
    this.count--
  }

  @action async getData() {
    try {
      const res = await Serv.getData();
      console.log(res, res)
      runInAction(() => {
        this.state.list = res.data
      })
    } catch(e) {
      console.log(e)
    }
  }

  @computed
  get doubleCount() {
    return this.count * 2
  }
}

export default Mod;