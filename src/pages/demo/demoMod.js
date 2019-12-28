import { observable, action, computed, configure } from 'mobx'
// 严格模式
configure({enforceActions: 'always'});

class Mod {
  @observable
  state={
    count:0
  }

  @action
  increment() {
    console.log(1111)
    this.state.count++
  }

  @action
  decrement() {
    this.state.count--
  }

  @computed
  get doubleCount() {
    return this.state.count * 2
  }
}

export default Mod;