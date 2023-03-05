(async ()=>{ await true;
    let routerModule = await import('./route/router.js')
    let router = routerModule.RouterFactory.createInstance();

    router.add('login', 'x-login');
    router.add('register', 'x-register');
    router.add('main', 'x-main');

    router.default('login');

    router.go();
})();
