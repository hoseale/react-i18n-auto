import { observable, action, computed } from 'mobx';
import $ from 'jquery';

export class Mod {
  @observable
  count = 0

  @observable
  state={
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

  @action getData() {
    $.getJSON('/assets/mock/hello.json', (res) => {
      console.log(res, 'res')
      this.state.list = res.data
    })
  }

  @computed
  get doubleCount() {
    return this.count * 2
  }
}

export default Mod;