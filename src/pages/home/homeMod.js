import Serv from './homeServ';
import { observable, action, computed, configure, runInAction } from 'mobx';

// 严格模式
configure({enforceActions: 'always'})

class Mod {
  @observable
  state={
    loading: false,
    total: 0,
    list: []
  }

  @action async getData(page=1) {
    try {
      const res = await Serv.getData();
      let list = [];
      if (page == 1) {
        list = res.data.slice(0, 2);
      } else if (page == 2) {
        list = res.data.slice(2, 4);
      } else if (page == 3) {
        list = res.data.slice(4);
      }
      runInAction(() => {
        this.state.list = list
        this.state.total = 5
      })
    } catch(e) {
      console.log(e)
    }
  }
}

export default Mod;