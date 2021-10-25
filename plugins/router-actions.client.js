export default ({ app: { router, store } }) => {
    router.beforeEach((to, from, next) => {
        window.scrollTo(0, 0);
        next();
    })
    router.afterEach((to, from) => {
        // console.log(to.path, from.path)


        if (from.path == '/2') {
            if (store.state.occupation.isFlyoverCompleted) {
                store.commit(`occupation/setFirstVisit`);
            }
        }

    })
  }