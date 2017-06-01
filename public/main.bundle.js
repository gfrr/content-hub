webpackJsonp([1,4],{

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jwt_decode__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jwt_decode__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SessionService = (function () {
    function SessionService(router, http) {
        this.router = router;
        this.http = http;
        this.BASE_URL = "https://content-hub.herokuapp.com";
        // set token if saved in local storage
        this.token = localStorage.getItem('token');
        if (this.token != null) {
            this.isAuth = true;
        }
        else {
            this.isAuth = false;
        }
    }
    SessionService.prototype.canActivate = function () {
        if (localStorage.getItem('token')) {
            this.token = localStorage.getItem('token');
            this.user = __WEBPACK_IMPORTED_MODULE_6_jwt_decode___default()(this.token).user;
            this.id = __WEBPACK_IMPORTED_MODULE_6_jwt_decode___default()(this.token).id;
            this.priv = __WEBPACK_IMPORTED_MODULE_6_jwt_decode___default()(this.token).private;
            this.isAuth = true;
            return true;
        }
        this.router.navigate(['/login']);
        this.isAuth = false;
        return false;
    };
    SessionService.prototype.isAuthenticated = function () {
        return this.token != null ? true : false;
    };
    SessionService.prototype.signup = function (user) {
        var _this = this;
        console.log("signup called");
        return this.http.post(this.BASE_URL + "/signup", user)
            .map(function (response) { return response.json(); })
            .map(function (response) {
            console.log(response);
            var token = response.token;
            var user = response.user;
            if (token) {
                // set token property
                _this.token = token;
                _this.user = __WEBPACK_IMPORTED_MODULE_6_jwt_decode___default()(token).user;
                _this.id = __WEBPACK_IMPORTED_MODULE_6_jwt_decode___default()(_this.token).id;
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', token);
                _this.isAuth = true;
                // return true to indicate successful login
                return true;
            }
            else
                return false; // return false to indicate failed login
        })
            .catch(function (err) { return __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__["Observable"].throw(err); });
    };
    SessionService.prototype.login = function (user) {
        var _this = this;
        console.log("login called");
        return this.http.post(this.BASE_URL + "/login", user)
            .map(function (response) {
            console.log(response);
            // login successful if there's a jwt token in the response
            var token = response.json() && response.json().token;
            var user = response.json() && response.json().user;
            if (token) {
                // set token property
                _this.token = token;
                _this.user = __WEBPACK_IMPORTED_MODULE_6_jwt_decode___default()(token).user;
                _this.id = __WEBPACK_IMPORTED_MODULE_6_jwt_decode___default()(_this.token).id;
                _this.isAuth = true;
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                // return true to indicate successful login
                return true;
            }
            else
                return false; // return false to indicate failed login
        });
    };
    SessionService.prototype.save = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': 'JWT ' + this.token });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.BASE_URL + "/users/" + this.id + "/save", data, options)
            .map(function (res) {
            var user = res.json() && res.json().user;
            localStorage.setItem('user', JSON.stringify(user));
            return true;
        });
    };
    SessionService.prototype.getSearches = function () {
        return JSON.parse(localStorage.user).searches;
    };
    SessionService.prototype.getFavorites = function () {
        return JSON.parse(localStorage.user).favorites;
    };
    SessionService.prototype.delete = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': 'JWT ' + this.token });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.delete(this.BASE_URL + "/users/" + this.id, options)
            .map(function (res) { return res.json(); });
    };
    SessionService.prototype.logout = function () {
        this.token = null;
        this.user = null;
        this.isAuth = false;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    };
    SessionService.prototype.getFavorite = function (id) {
        return this.http.get(this.BASE_URL + "/search/" + id)
            .map(function (res) {
            return res.json();
        });
    };
    //search queries, this is gonna go in another service as soon as i'm finished
    SessionService.prototype.getTags = function () {
        return this.http.get(this.BASE_URL + "/search/trends")
            .map(function (res) {
            return res.json();
        });
    };
    SessionService.prototype.getPopular = function () {
        return this.http.get(this.BASE_URL + "/search/popular")
            .map(function (res) {
            return res.json();
        });
    };
    SessionService.prototype.saveSearch = function (query) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': 'JWT ' + this.token });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        query.action = "add";
        return this.http.patch(this.BASE_URL + "/users/" + this.id + "/search", query, options)
            .map(function (res) {
            var user = res.json() && res.json().user;
            localStorage.setItem('user', JSON.stringify(user));
            return true;
        });
    };
    SessionService.prototype.removeSearch = function (query) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': 'JWT ' + this.token });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        query.action = "delete";
        return this.http.patch(this.BASE_URL + "/users/" + this.id + "/search/", query, options)
            .map(function (res) {
            var user = res.json() && res.json().user;
            localStorage.setItem('user', JSON.stringify(user));
            return true;
        });
    };
    SessionService.prototype.removeContent = function (query) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': 'JWT ' + this.token });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.patch(this.BASE_URL + "/users/" + this.id + "/save", query, options)
            .map(function (res) {
            if (res.json().user) {
                var user = res.json() && res.json().user;
                localStorage.setItem('user', JSON.stringify(user));
                return true;
            }
            return false;
        });
    };
    SessionService.prototype.searchYoutube = function (query) {
        return this.http.post(this.BASE_URL + "/search/youtube", query)
            .map(function (response) {
            return response.json();
        });
    };
    SessionService.prototype.searchTwitter = function (query) {
        return this.http.post(this.BASE_URL + "/search/twitter", query)
            .map(function (response) {
            return response.json();
        });
    };
    SessionService.prototype.searchReddit = function (query) {
        return this.http.post(this.BASE_URL + "/search/reddit", query)
            .map(function (response) {
            return response.json();
        });
    };
    SessionService.prototype.searchTumblr = function (query) {
        return this.http.post(this.BASE_URL + "/search/tumblr", query)
            .map(function (response) {
            return response.json();
        });
    };
    return SessionService;
}());
SessionService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _b || Object])
], SessionService);

var _a, _b;
//# sourceMappingURL=session.service.js.map

/***/ }),

/***/ 162:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 162;


/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(183);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(262),
        styles: [__webpack_require__(240)]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_routing__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__index_index_component__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__user_user_component__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__auth_signup_signup_component__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__auth_login_login_component__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_session_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__auth_dashboard_dashboard_component__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__content_content_component__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__nav_bar_nav_bar_component__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_platform_browser_dynamic__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pipes_safe_pipe__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pipes_twitter_pipe__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__tweet_tweet_component__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__youtube_youtube_component__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__reddit_reddit_component__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__tumblr_tumblr_component__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__auth_dashboard_edit_edit_component__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__auth_dashboard_delete_delete_component__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__angular_platform_browser_animations__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_ng2_tag_input__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_ng2_tag_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_26_ng2_tag_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_hammerjs__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_27_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__angular_material__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pipes_tag_pipe__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pipes_content_pipe__ = __webpack_require__(175);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};































var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_8__index_index_component__["a" /* IndexComponent */],
            __WEBPACK_IMPORTED_MODULE_9__user_user_component__["a" /* UserComponent */],
            __WEBPACK_IMPORTED_MODULE_10__auth_signup_signup_component__["a" /* SignupComponent */],
            __WEBPACK_IMPORTED_MODULE_11__auth_login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_13__auth_dashboard_dashboard_component__["a" /* DashboardComponent */],
            __WEBPACK_IMPORTED_MODULE_14__content_content_component__["a" /* ContentComponent */],
            __WEBPACK_IMPORTED_MODULE_15__nav_bar_nav_bar_component__["a" /* NavBarComponent */],
            __WEBPACK_IMPORTED_MODULE_17__pipes_safe_pipe__["a" /* SafePipe */],
            __WEBPACK_IMPORTED_MODULE_18__pipes_twitter_pipe__["a" /* TwitterPipe */],
            __WEBPACK_IMPORTED_MODULE_19__tweet_tweet_component__["a" /* TweetComponent */],
            __WEBPACK_IMPORTED_MODULE_20__youtube_youtube_component__["a" /* YoutubeComponent */],
            __WEBPACK_IMPORTED_MODULE_21__reddit_reddit_component__["a" /* RedditComponent */],
            __WEBPACK_IMPORTED_MODULE_22__tumblr_tumblr_component__["a" /* TumblrComponent */],
            __WEBPACK_IMPORTED_MODULE_23__auth_dashboard_edit_edit_component__["a" /* EditComponent */],
            __WEBPACK_IMPORTED_MODULE_24__auth_dashboard_delete_delete_component__["a" /* DeleteComponent */],
            __WEBPACK_IMPORTED_MODULE_29__pipes_tag_pipe__["a" /* TagPipe */],
            __WEBPACK_IMPORTED_MODULE_30__pipes_content_pipe__["a" /* ContentPipe */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* RouterModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_routing__["a" /* routes */]),
            __WEBPACK_IMPORTED_MODULE_25__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_26_ng2_tag_input__["TagInputModule"],
            __WEBPACK_IMPORTED_MODULE_28__angular_material__["a" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_28__angular_material__["b" /* MdNativeDateModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_28__angular_material__["c" /* MdSlideToggleModule */],
            __WEBPACK_IMPORTED_MODULE_28__angular_material__["d" /* MdRadioModule */],
            __WEBPACK_IMPORTED_MODULE_28__angular_material__["e" /* MdSelectModule */],
            __WEBPACK_IMPORTED_MODULE_28__angular_material__["f" /* MdButtonToggleModule */],
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_12__services_session_service__["a" /* SessionService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
    })
], AppModule);

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_16__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(AppModule);
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_session_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_index_component__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_user_component__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_signup_signup_component__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_login_login_component__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_dashboard_dashboard_component__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__content_content_component__ = __webpack_require__(95);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });







var routes = [
    { path: 'index', component: __WEBPACK_IMPORTED_MODULE_1__index_index_component__["a" /* IndexComponent */] },
    { path: "", redirectTo: "index", pathMatch: "full" },
    { path: "signup", component: __WEBPACK_IMPORTED_MODULE_3__auth_signup_signup_component__["a" /* SignupComponent */] },
    { path: "dashboard", component: __WEBPACK_IMPORTED_MODULE_5__auth_dashboard_dashboard_component__["a" /* DashboardComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__services_session_service__["a" /* SessionService */]] },
    { path: "login", component: __WEBPACK_IMPORTED_MODULE_4__auth_login_login_component__["a" /* LoginComponent */] },
    { path: "user/:id", component: __WEBPACK_IMPORTED_MODULE_2__user_user_component__["a" /* UserComponent */] },
    { path: "content", component: __WEBPACK_IMPORTED_MODULE_6__content_content_component__["a" /* ContentComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__services_session_service__["a" /* SessionService */]] }
];
//# sourceMappingURL=app.routing.js.map

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeleteComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DeleteComponent = (function () {
    function DeleteComponent() {
    }
    DeleteComponent.prototype.ngOnInit = function () {
    };
    return DeleteComponent;
}());
DeleteComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-delete',
        template: __webpack_require__(264),
        styles: [__webpack_require__(242)]
    }),
    __metadata("design:paramtypes", [])
], DeleteComponent);

//# sourceMappingURL=delete.component.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EditComponent = (function () {
    function EditComponent() {
    }
    EditComponent.prototype.ngOnInit = function () {
    };
    return EditComponent;
}());
EditComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-edit',
        template: __webpack_require__(265),
        styles: [__webpack_require__(243)]
    }),
    __metadata("design:paramtypes", [])
], EditComponent);

//# sourceMappingURL=edit.component.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_session_service__ = __webpack_require__(15);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavBarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NavBarComponent = (function () {
    function NavBarComponent(session, router) {
        this.session = session;
        this.router = router;
    }
    NavBarComponent.prototype.ngOnInit = function () {
    };
    NavBarComponent.prototype.logout = function () {
        this.session.logout();
    };
    return NavBarComponent;
}());
NavBarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-nav-bar',
        template: __webpack_require__(270),
        styles: [__webpack_require__(248)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_session_service__["a" /* SessionService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], NavBarComponent);

var _a, _b;
//# sourceMappingURL=nav-bar.component.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ContentPipe = (function () {
    function ContentPipe() {
    }
    ContentPipe.prototype.transform = function (value, fil) {
        if (fil === void 0) { fil = undefined; }
        if (typeof (fil) !== "undefined") {
            return value.filter(function (elem) {
                if (fil.indexOf(elem.content.searchTag) != -1)
                    return elem;
            });
        }
        return value;
    };
    return ContentPipe;
}());
ContentPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'content',
        pure: false
    })
], ContentPipe);

//# sourceMappingURL=content.pipe.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SafePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SafePipe = (function () {
    function SafePipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafePipe.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    return SafePipe;
}());
SafePipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'safe' }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["f" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["f" /* DomSanitizer */]) === "function" && _a || Object])
], SafePipe);

var _a;
//# sourceMappingURL=safe.pipe.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TagPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TagPipe = (function () {
    function TagPipe() {
    }
    TagPipe.prototype.transform = function (value, min, max) {
        if (typeof (value) !== undefined) {
            return value.filter(function (elem, index) {
                if (index >= min && index <= max)
                    return elem;
            });
        }
        return [""];
    };
    return TagPipe;
}());
TagPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'tag',
        pure: false
    })
], TagPipe);

//# sourceMappingURL=tag.pipe.js.map

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TwitterPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TwitterPipe = (function () {
    function TwitterPipe() {
    }
    TwitterPipe.prototype.transform = function (input, args) {
        var result = input.split(" ");
        result = result.map(function (word) {
            if (word.match(/https/g))
                word = "<a href=" + word + ">" + word + "</a>";
            word = word.replace(/(@)\w+/g, "<a href=\"https://twitter.com/" + word.substring(1) + "\">" + word + "</a>");
            word = word.replace(/(#)\w+/g, "<a href=\"https://twitter.com/hashtag/" + word.substring(1) + "?src=hash\">" + word + "</a> ");
            return word;
        }).join(" ");
        result = "<p lang=\"en\" dir=\"ltr\" class=\"tweet-text\">" + result + "</p>";
        return result;
    };
    return TwitterPipe;
}());
TwitterPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'twitter',
        pure: false
    })
], TwitterPipe);

//# sourceMappingURL=twitter.pipe.js.map

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_session_service__ = __webpack_require__(15);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RedditComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RedditComponent = (function () {
    function RedditComponent(session) {
        this.session = session;
        this.onFavorite = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
    }
    RedditComponent.prototype.swipe = function (action) {
        if (action === this.SWIPE_ACTION.RIGHT) {
            this.save(this.reddit);
        }
        if (action === this.SWIPE_ACTION.LEFT) {
            this.onQuote();
        }
    };
    ;
    RedditComponent.prototype.ngOnChanges = function () {
    };
    RedditComponent.prototype.onQuote = function () {
        this.onFavorite.emit("reddit");
    };
    RedditComponent.prototype.save = function (data) {
        var _this = this;
        var newReddit = {
            data: {
                permalink: data.data.permalink,
                title: data.data.title,
                url: data.data.url,
                thumbnail: data.data.thumbnail,
                preview: {
                    images: data.data.thumbnail,
                },
                author: data.data.author,
                subreddit_name_prefixed: data.data.subreddit_name_prefixed,
                created: data.data.created,
                score: data.data.score
            }
        };
        this.session.save({
            source: "REDDIT",
            uniqueRef: data.data.permalink,
            data: {
                reddit: newReddit
            },
            searchTag: this.search
        }).subscribe(function () {
            _this.onQuote();
        });
    };
    return RedditComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], RedditComponent.prototype, "reddit", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], RedditComponent.prototype, "search", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], RedditComponent.prototype, "showButtons", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], RedditComponent.prototype, "onFavorite", void 0);
RedditComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-reddit',
        template: __webpack_require__(271),
        styles: [__webpack_require__(249)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_session_service__["a" /* SessionService */]) === "function" && _a || Object])
], RedditComponent);

var _a;
//# sourceMappingURL=reddit.component.js.map

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_session_service__ = __webpack_require__(15);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TumblrComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TumblrComponent = (function () {
    function TumblrComponent(session) {
        this.session = session;
        this.onFavorite = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
    }
    TumblrComponent.prototype.swipe = function (action) {
        if (action === this.SWIPE_ACTION.RIGHT) {
            this.save(this.tumblr);
        }
        if (action === this.SWIPE_ACTION.LEFT) {
            this.onQuote();
        }
    };
    ;
    TumblrComponent.prototype.ngOnInit = function () {
    };
    TumblrComponent.prototype.onQuote = function () {
        this.onFavorite.emit("tumblr");
    };
    TumblrComponent.prototype.save = function (data) {
        var _this = this;
        this.session.save({
            source: "TUMBLR",
            uniqueRef: data.id,
            data: {
                tumblr: data
            },
            searchTag: this.search
        }).subscribe(function () {
            _this.onQuote();
        });
    };
    return TumblrComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TumblrComponent.prototype, "tumblr", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TumblrComponent.prototype, "search", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], TumblrComponent.prototype, "showButtons", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], TumblrComponent.prototype, "onFavorite", void 0);
TumblrComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-tumblr',
        template: __webpack_require__(272),
        styles: [__webpack_require__(250)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_session_service__["a" /* SessionService */]) === "function" && _a || Object])
], TumblrComponent);

var _a;
//# sourceMappingURL=tumblr.component.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_session_service__ = __webpack_require__(15);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TweetComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TweetComponent = (function () {
    function TweetComponent(session) {
        this.session = session;
        this.onFavorite = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
    }
    TweetComponent.prototype.swipe = function (action) {
        if (action === this.SWIPE_ACTION.RIGHT) {
            this.save(this.tweet);
        }
        if (action === this.SWIPE_ACTION.LEFT) {
            this.onQuote();
        }
    };
    ;
    TweetComponent.prototype.ngOnInit = function () {
    };
    TweetComponent.prototype.onQuote = function () {
        this.onFavorite.emit("tweet");
    };
    TweetComponent.prototype.save = function (data) {
        var _this = this;
        this.session.save({
            source: "TWITTER",
            uniqueRef: data.id_str,
            data: {
                tweet: data
            },
            searchTag: this.search
        }).subscribe(function () {
            _this.onQuote();
        });
    };
    return TweetComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TweetComponent.prototype, "tweet", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TweetComponent.prototype, "search", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], TweetComponent.prototype, "showButtons", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], TweetComponent.prototype, "onFavorite", void 0);
TweetComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-tweet',
        template: __webpack_require__(273),
        styles: [__webpack_require__(251)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_session_service__["a" /* SessionService */]) === "function" && _a || Object])
], TweetComponent);

var _a;
//# sourceMappingURL=tweet.component.js.map

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_session_service__ = __webpack_require__(15);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YoutubeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var YoutubeComponent = (function () {
    function YoutubeComponent(session) {
        this.session = session;
        this.onFavorite = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
    }
    YoutubeComponent.prototype.ngOnInit = function () {
    };
    YoutubeComponent.prototype.swipe = function (action) {
        if (action === this.SWIPE_ACTION.RIGHT) {
            this.save(this.video);
        }
        if (action === this.SWIPE_ACTION.LEFT) {
            this.onQuote();
        }
    };
    ;
    YoutubeComponent.prototype.onQuote = function () {
        this.onFavorite.emit("video");
    };
    YoutubeComponent.prototype.save = function (data) {
        var _this = this;
        this.session.save({
            source: "YOUTUBE",
            uniqueRef: data,
            data: {
                video: data
            },
            searchTag: this.search
        }).subscribe(function () {
            _this.onQuote();
        });
    };
    return YoutubeComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], YoutubeComponent.prototype, "video", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], YoutubeComponent.prototype, "search", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], YoutubeComponent.prototype, "showButtons", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], YoutubeComponent.prototype, "onFavorite", void 0);
YoutubeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-youtube',
        template: __webpack_require__(275),
        styles: [__webpack_require__(253)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_session_service__["a" /* SessionService */]) === "function" && _a || Object])
], YoutubeComponent);

var _a;
//# sourceMappingURL=youtube.component.js.map

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false,
    BASE_URL: "https://content-hub.herokuapp.com",
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".container-fluid{\n  margin-top:70px;\n  padding:0px;\n}\n.search-video-cont{\n  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);\n  padding-top:1vh;\n  padding-bottom:1vh;\n  margin:0px;\n  padding-left: 0px;\n  padding-right:0px;\n  margin-bottom: 10px;\n  /*background-color:rgba(255, 0, 0, 0.1);*/\n}\n\n.remove:hover{\n  cursor: pointer;\n}\n\n.confirm {\n  text-align: center;\n}\n\n.tags {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: wrap;\n      flex-flow: wrap;\n}\n\n.search-tags{\n  padding:3px;\n  background-color: rgba(28, 40, 51, 1);\n  color: white;\n  border-radius: 10%;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-right: 10px;\n  margin-bottom: 3px;\n}\n.search-tags span {\n  color: #E74C3C;\n}\n.white-span{\n  color:white;\n}\n\nh4{\n  font-weight:500;\n  color:black;\n  margin-bottom:5px;\n}\n.row{\n  margin:0px;\n  padding:0px;\n}\n.edit-button{\n  margin-bottom:0px;\n  border:0px;\n  background-color: #1C2833;\n}\n.delete-button{\n  margin-left: 3px;\n  border:0px;\n  background-color: #1C2833;\n}\n.remove-yt{\n  color: #1C2833;\n  position:relative;\n}\n.remove-tw{\n  color: #1C2833;\n  position:relative;\n}\n.remove-re{\n  color: #1C2833;\n  position:relative;\n}\n.remove-tu{\n  color: #1C2833;\n  position:relative;\n}\n.main-content{\n  margin-top: 7vh;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.content{\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.content-wrapper{\n  max-width:800px;\n}\n.right-side{\n  margin-top:10px;\n}\n/*youtube START*/\n.yt-wrapper{\n  width:100%;\n  height:auto;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 10px;\n  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.1) ;\n  margin-top:10px;\n}\n/*youtube END*/\n\n/*TWEET START*/\n.tweet-wrapper{\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.1) ;\n  padding: 10px;\n  margin-top:10px;\n}\n/*TWEET END*/\n\n/*REDDIT START*/\n.reddit-wrapper{\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.1) ;\n  padding: 10px;\n  margin-top:10px;\n}\n/*REDDIT END*/\n\n/*TUMBLR START*/\n.tumblr-wrapper{\n  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.1) ;\n  padding: 10px;\n  margin-top:10px;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n}\n/*TUMBLR END*/\n\n.yes-delete-btn{\n  margin-left: 3px;\n  border:0px;\n  background-color: #1C2833;\n}\n.no-delete-btn{\n  margin-left: 3px;\n  border:0px;\n  background-color: #1C2833;\n}\n\n.tag-input-wrapper{\n  height:70px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".background-image{\n  background: url(/./assets/images/background4.jpg) no-repeat center center fixed;\n  background-size: cover;\n  -webkit-filter: blur(2px);\n  -moz-filter: blur(2px);\n  -o-filter: blur(2px);\n  -ms-filter: blur(2px);\n  filter: blur(2px);\n  width:100vw;\n  height:100vh;\n  z-index:-100;\n  position: fixed;\n}\n.container-fluid{\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  height:100vh; /*100vh*/\n  padding-left: 0px;\n  padding-right:0px;\n  margin:0;\n}\n.card-container.card {\n  min-width: 350px;\n  max-width: 500px;\n  padding: 25px 25px;\n}\n.profile-img-card {\n  width: 96px;\n  height: 96px;\n  margin: 0 auto 10px;\n  display: block;\n  border-radius: 50%;\n}\n.card {\n  background-color: #F7F7F7;\n  /* just in case there no content*/\n  padding: 20px 25px 30px;\n  margin: 0 auto 25px;\n  margin-top: 40px;\n  /* shadows and rounded borders */\n  border-radius: 2px;\n  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);\n}\n.label-password {\n\n}\n.label-username {\n\n}\n#InputUsername,#InputPassword{\n  direction: ltr;\n  height: 44px;\n  font-size: 16px;\n}\n.btn-login {\n  width: 100%;\n  background-color: #1C2833;\n  padding: 0px;\n  font-size: 16px;\n  height: 36px;\n  border-radius: 3px;\n  border: none;\n  transition: all 0.218s;\n}\n\n\n\ninput:focus{\n  border: 2px solid #E74C3C;\n  box-shadow: #E74C3C;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".background-image{\n  background: url(/./assets/images/background4.jpg) no-repeat center center fixed;\n   background-size: cover;\n   -webkit-filter: blur(2px);\n  -moz-filter: blur(2px);\n  -o-filter: blur(2px);\n  -ms-filter: blur(2px);\n  filter: blur(2px);\n  width:100vw;\n  height:100vh;\n  z-index:-100;\n  position: fixed;\n}\n.container-fluid{\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  height:100vh; /*100vh*/\n  padding-left: 0px;\n  padding-right:0px;\n  margin:0;\n}\n.card-container.card {\n    min-width: 350px;\n    max-width: 500px;\n    padding: 25px 25px;\n}\n.profile-img-card {\n    width: 96px;\n    height: 96px;\n    margin: 0 auto 10px;\n    display: block;\n    border-radius: 50%;\n}\n.card {\n    background-color: #F7F7F7;\n    /* just in case there no content*/\n    padding: 20px 25px 30px;\n    margin: 0 auto 25px;\n    margin-top: 40px;\n    /* shadows and rounded borders */\n    border-radius: 2px;\n    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);\n}\n.label-password {\n\n}\n.label-username {\n\n}\n#InputUsername,#InputPassword{\n    direction: ltr;\n    height: 44px;\n    font-size: 16px;\n}\n.btn-signin {\n  width: 100%;\n  background-color: #1C2833;\n  padding: 0px;\n  font-size: 16px;\n  height: 36px;\n  border-radius: 3px;\n  border: none;\n  transition: all 0.218s;\n}\ninput:focus{\n  border: 2px solid #E74C3C;\n  box-shadow: #E74C3C;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "div{\n  font-family: , sans-serif;\n}\n.container-fluid{\n  margin-top:0px;\n  padding-left:0px;\n  padding-right:0px;\n}\n.content-wrapper{\n  width:100vw;\n  margin-top: 70px;\n}\n.search-video-cont{\n  padding-top:1vh;\n  padding-bottom:1vh;\n  margin:0px;\n  padding-left: 0px;\n  padding-right:0px;\n  margin-bottom: 10px;\n  /*background-color:rgba(255, 0, 0, 0.1);*/\n}\n.row{\n  width:100%;\n  margin:0px;\n  padding:0px;\n}\n.search {\n  text-align: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: column;\n          flex-flow: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding-left: 5vw;\n  padding-right:5vw;\n\n}\ninput{\n  background-color: white;\n}\ninput:focus{\n  border:2px solid #E74C3C;\n}\n.search-btn{\n  width: 100%;\n  background-color: #1C2833;\n  padding: 0px;\n  font-size: 16px;\n  height: 36px;\n  border-radius: 3px;\n  border: none;\n  transition: all 0.218s;\n}\n.search-btn:hover{\n  color:#E74C3C;\n}\n/*search END*/\n/*side bar START*/\nh4{\n  font-weight:500;\n  color:black;\n  margin-bottom:5px;\n}\nul{\n  margin-bottom:10px;\n}\nli{\n  margin-bottom: 5px;\n}\n.side-left{\n  padding-left: 10px;\n  padding-right:5px;\n  /*background-color:rgba(255, 0, 0, 0.2);*/\n}\n.side-right{\n  padding-left: 10px;\n  padding-right:5px;\n  /*background-color:rgba(200, 110, 0, 0.2);*/\n}\n.search-tags{\n  padding:3px;\n  background-color: rgba(28, 40, 51, 1);\n  color: #E74C3C;\n  border-radius: 10%;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-right: 10px;\n  margin-bottom: 3px;\n  cursor: pointer;\n}\n\n.search-tags a {\n  color: white;\n}\n\n.searchfield {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n\n}\n.searchfield input {\n  -webkit-box-flex: 3;\n      -ms-flex: 3;\n          flex: 3;\n}\n.searchfield button {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  margin-left: 5px;\n}\n\n.search-tags a:hover {\n  text-decoration: none;\n  cursor: pointer;\n  color: #E74C3C;\n}\n\n.trending-tags{\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  margin-right: 10px;\n  background-color: rgba(28, 40, 51, 1);\n  border-radius: 10%;\n  margin-right: 10px;\n  margin-bottom: 5px;\n}\n\n.trending-tags a {\n  color: white;\n}\n\n.trending-tags a:hover {\n  text-decoration: none;\n  cursor: pointer;\n  color: #E74C3C;\n}\n\n.tag-control {\n  width: 70px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.tags-wrapper{\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.glyphicon-remove{\n  margin-left: 3px;\n  width:80%;\n  height:80%;\n}\n/*side bar END*/\n\n.radio-buttons-wrapper{\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.trending-radio{\n  margin-left: 10px;\n}\n.popular-radio{\n  margin-right:10px;\n}\n/*.radios-group-buttons {\n  margin: 6px;\n  height: 5vh;\n  background-color:rgba(28, 40, 51, 1);\n  border-radius: 3px;\n  color: white;\n}\n\n.radios-group-buttons:active {\n  color: #E74C3C;\n}\n\n.radious-group-buttons button{\n  color: #E74C3C !important;\n}\n*/\n/*youtube START*/\n.yt-wrapper{\n  width:100%;\n  height:auto;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 10px;\n  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.1) ;\n  margin-top:10px;\n}\n/*youtube END*/\n/*TWEET START*/\n\n.tweet-wrapper{\n  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.1) ;\n  padding: 10px;\n  margin-top:10px;\n}\n/*TWEET END*/\n\n/*REDDIT START*/\n.reddit-wrapper{\n  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.1) ;\n  padding: 10px;\n  margin-top:10px;\n}\n/*REDDIT END*/\n\n/*TUMBLR START*/\n.tumblr-wrapper{\n  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.1) ;\n  padding: 10px;\n  margin-top:10px;\n  /*border: 2px dotted red;*/\n}\n/*TUMBLR END*/\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "h1{\n  color: #E74C3C;\n  font-size: 65px;\n  font-family: 'Patua One', sans-serif;\n}\n\ninput{\n  border-radius: 0;\n}\n.background-image{\n  background: url(/./assets/images/background4.jpg) no-repeat center center fixed;\n   background-size: cover;\n   -webkit-filter: blur(2px);\n  -moz-filter: blur(2px);\n  -o-filter: blur(2px);\n  -ms-filter: blur(2px);\n  filter: blur(2px);\n  width:100vw;\n  height:100vh;\n  z-index:-100;\n  position: fixed;\n}\n.content-center{\n  width:100vw;\n  height:100vh;\n  display:-webkit-box;\n  display:-ms-flexbox;\n  display:flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: column;\n          flex-flow: column;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  background-color: rgba(0, 0, 0, 0.5);\n}\n.content-1{\n  padding-top:10px;\n  padding-bottom:0px;\n  width: 95vw;\n  height:80px;;\n  display: -webkit-box;;\n  display: -ms-flexbox;;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: column;\n          flex-flow: column;\n}\n.phone-images-wrapper{\n  margin-top:10px;\n  width:95vw;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  max-width:1200px;\n}\n.phone-cont{\n  margin-bottom:20px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding:0px;\n  color: white;\n  /*border:2px dotted red;*/\n}\n.row{\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding:0px;\n  margin:0px;\n}\n.phone-1{\n  width:40%;\n  height:40%;\n  max-height:\n}\n.phone-description{\n;\n  color:white;\n  padding-right:0px;\n  padding-left:0px;\n\n}\n.description-header{\n  text-align: center;\n}\n.description-wrapper{\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  height:65px;\n}\n.description-para{\n  text-align: center;\n  width:80%;\n}\nh2{\n  margin-bottom:10px;\n}\nh4{\n  margin-top: 15px;\n  margin-bottom:10px;\n}\n.signup-box{\n  text-align: center;\n}\na{\n color: #E74C3C;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "/*navbar start*/\n.navbar{\n  width:100vw;\n  z-index:2;\n  margin:0px;\n  background-color: #1C2833;\n  height: 7vh;\n}\nul li span{\n  color: #E74C3C;\n}\n.navbar-default .navbar-toggle .icon-bar {\n  background-color: white;\n}\nul li a{\n  font-family: 'Patua One', cursive;\n  color: white;\n}\n#logout-button{\n  border:0px;\n  background-color: #1C2833;\n}\n.navbar-toggle:hover{\n  border:#E74C3C;\n  background-color:#E74C3C;\n}\n.collapsed{\n  /*background-color:#E74C3C;*/\n}\n.navbar-collapse{\n  background-color:#1C2833;\n}\n\n.navbar-right{\n  margin-right:15px;\n}\n\n.navbar-brand{\n  font-family: 'Patua One', cursive;\n  color: #E74C3C;\n}\n.navbar-header{\n  background-color: #1C2833;\n}\n.icon-bar{\n  color: white;\n}\n/*navbar end*/\n\na:hover {\n  cursor:pointer;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".reddit-pic-wrapper {\n  max-width:200px;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.icon-wrapper{\n  margin-top:8px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.icon{\n  width: 30px;\n  height: 30px;\n}\n.icon:hover{\n  cursor: pointer;\n}\n\n.reddit-info-wrapper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.reddit-title{\n  margin-bottom: 3px;\n}\n.reddit-text{\n  -webkit-box-flex: 2;\n      -ms-flex: 2;\n          flex: 2;\n  padding-left: 8px;\n}\np {\n  font-size: 15px;\n  margin-bottom: 1px;\n}\nh4{\n  margin-bottom: 3px;\n  font-size: 17px;\n  font-weight: 500;\n}\na{\n  color: #3a7baf;\n}\n.save-button{\n  border:0px;\n  background-color: #d27983;\n}\n.wat-button{\n  border:0px;\n  background-color: #d27983;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".tumblr-wrapper{\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.content-image{\n  max-width:200px;\n  -webkit-box-flex:1;\n      -ms-flex:1;\n          flex:1;\n  margin-right: 5px;\n}\n.content-wrapper{\n  -webkit-box-flex:3;\n      -ms-flex:3;\n          flex:3;\n}\n.save-button{\n  border:0px;\n  background-color: #d27983;\n}\n.wat-button{\n  border:0px;\n  background-color: #d27983;\n}\n.icon-wrapper{\n  margin-top:8px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.icon{\n  width: 30px;\n  height: 30px;\n}\n.icon:hover{\n  cursor: pointer;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".icon-wrapper{\n  margin-top:8px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.icon{\n  width: 30px;\n  height: 30px;\n}\n.icon:hover{\n  cursor: pointer;\n}\n\n/*left side -- profile pic START*/\n.left-profile-pic{\n  padding-right: 10px;\n  padding-left:0px;\n}\n.twitter-pic{\n  min-width: 45px;\n  min-height: 45px;\n  margin-right: 5px;\n  margin-bottom:5px;\n  height: auto;\n  border-radius:10%;\n}\n/*left side -- profile pic END*/\n/*right side - tweet content START*/\n.tweet-wrapper{\n  padding-right:0px;\n}\n.right-tweet-content{\n  padding-left:0px;\n  padding-right:0px;\n}\n.username-date-wrapper{\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.twitter-username{/*username and @handle*/\n  line-height: 1.2;\n  margin-bottom:3px ;\n  font-weight: 600;\n  margin-right: 5px;\n}\n.twitter-handle{\n  margin-bottom:3px ;\n  margin-right: 5px;\n}\n.date{/*date*/\n  color: #28586f;\n  line-height: 1.2;\n  font-style: italic;\n  margin-bottom: 3px;\n  margin-left: 5px;\n}\n.twitter-tweet{\n  color: #28586f;\n  font-size: 16px;\n  font-family: helvetica, sans-serif;\n  margin-bottom: -18px;\n}\np{\n  margin:0px;\n}\na{\n  color:black;\n}\n/*right side - tweet content END*/\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "iframe{\n/*normal size:*/\n  width:504px;\n  height:283px;\n  max-width:100%;\n  max-height: 30vh;\n\n  /*max-width:85vw;*/\n  /*height:auto;\n  width:504px;*/\n}\n.icon-wrapper{\n  margin-top:8px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.icon{\n  width: 30px;\n  height: 30px;\n}\n\n.icon:hover{\n  cursor: pointer;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 262:
/***/ (function(module, exports) {

module.exports = "\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ 263:
/***/ (function(module, exports) {

module.exports = "<app-nav-bar></app-nav-bar>\n<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-xs-12 col-sm-3 search-section\">\n      <div >\n\n        <h4>Filter your content by hashtag</h4>\n        <div class=\"tag-input-wrappertags\">\n          <tag-input [ngModel]=\"[]\"\n          [theme]=\"'dark'\"\n          [onlyFromAutocomplete]=true\n          [addOnBlur]=\"true\"\n          [clearOnBlur]=\"true\"\n          (onAdd)=\"onItemAdded($event)\"\n          (onRemove)=\"onItemRemoved($event)\">\n          <tag-input-dropdown [autocompleteItems]=\"autocompleteItems\">\n          </tag-input-dropdown>\n        </tag-input>\n      </div>\n    </div>\n    <div>\n      <h4>Manage your search history:</h4>\n      <div class=\"search-tags\" *ngFor=\"let search of searches; let i=index\">\n          #{{search}}\n          <span (click)=\"removeTag(search)\" class=\"glyphicon glyphicon-remove remove\"></span>\n        </div><!-- search-tags -->\n\n    </div>\n\n    </div><!-- search-section -->\n  <div class=\"col-xs-12 col-sm-8 content\">\n\n    <div class=\"content-wrapper\" *ngIf=\"favorites.length>0\">\n      <div *ngFor=\"let favorite of favoritesData | content:filtered; let i = index\">\n        <div class=\"youtube-dash\">\n          <div class=\"yt-wrapper\" *ngIf=\"favorite.content.source == 'YOUTUBE'\">\n            <app-youtube [video]=favorite.content.data.video [showButtons]=false></app-youtube>\n            <a class=\"remove remove-yt\" (click)=\"remove(favorite.content._id, i)\"><span  class=\"glyphicon glyphicon-remove\"></span></a>\n          </div><!-- yt-wrapper -->\n        </div><!-- youtube-dash -->\n        <div class=\"twitter-dash\">\n          <div class=\"tweet-wrapper\" *ngIf=\"favorite.content.source == 'TWITTER'\">\n            <app-tweet [tweet]=favorite.content.data.tweet [showButtons]=false></app-tweet>\n            <a class=\"remove remove-tw\"(click)=\"remove(favorite.content._id, i)\"><span class=\"glyphicon glyphicon-remove\"></span></a>\n          </div><!-- tweet-wrapper -->\n        </div><!-- twitter-dash -->\n        <div class=\"reddit-dash\">\n          <div class=\"reddit-wrapper\" *ngIf=\"favorite.content.source == 'REDDIT'\">\n            <app-reddit [reddit]=favorite.content.data.reddit [showButtons]=false ></app-reddit>\n            <a class=\"remove remove-re\"(click)=\"remove(favorite.content._id, i)\"><span class=\"glyphicon glyphicon-remove\"></span></a>\n          </div><!-- reddit-wrapper -->\n        </div><!-- reddit-dash -->\n        <div class=\"tumblr-dash\">\n          <div class=\"tumblr-wrapper\" *ngIf=\"favorite.content.source == 'TUMBLR'\">\n            <app-tumblr [tumblr]=favorite.content.data.tumblr [showButtons]=false></app-tumblr>\n            <a class=\"remove remove-tu\"(click)=\"remove(favorite.content._id, i)\"><span class=\"glyphicon glyphicon-remove\"></span></a>\n          </div><!-- tumblr-wrapper -->\n        </div><!-- tumblr-dash -->\n      </div><!-- *ngFor -->\n    </div><!-- content-wrapper *ngIf -->\n  </div><!-- content -->\n  <div class=\"col-xs-12 col-sm-3 right-side\">\n\n    <button *ngIf=\"visible\" class=\"delete-button\" (click)=\"delete()\">delete profile</button>\n    <div *ngIf=\"!visible\">\n      <h4>\n        Do you really want to delete your profile?\n      </h4>\n      <button class=\"yes-delete-btn\"(click)=\"yes()\">YES</button><button class=\"no-delete-btn\" (click)=\"no()\">NO</button>\n    </div>\n\n\n\n  </div><!-- right-side -->\n</div><!-- row -->\n</div><!-- container-fluid -->\n"

/***/ }),

/***/ 264:
/***/ (function(module, exports) {

module.exports = "<p>\n  delete works!\n</p>\n"

/***/ }),

/***/ 265:
/***/ (function(module, exports) {

module.exports = "<p>\n  edit works!\n</p>\n"

/***/ }),

/***/ 266:
/***/ (function(module, exports) {

module.exports = "<app-nav-bar></app-nav-bar>\n<div class=\"background-image\"></div>\n<div class=\"container-fluid\">\n    <div class=\"card card-container\">\n      <img id=\"profile-img\" class=\"profile-img-card\" src=\"//ssl.gstatic.com/accounts/ui/avatar_2x.png\" />\n      <br />\n\t    <form>\n\t      <div class=\"form-group\">\n\t        <label class=\"label-username\" for=\"InputUsername\">username</label>\n\t        <input type=\"email\" required class=\"form-control\" id=\"InputUsername\" placeholder=\"username\" [(ngModel)]=\"user.username\" name=\"username\">\n\t      </div>\n\t      <div class=\"form-group\">\n\t        <label class=\"label-password\" for=\"InputPassword\">Password</label>\n\t        <input type=\"password\" required class=\"form-control\" id=\"InputPassword\" placeholder=\"Password\" [(ngModel)]=\"user.password\" name=\"password\">\n\t      </div>\n\t      <button type=\"submit\" class=\"btn btn-login btn-default btn-primary\" (click)=\"login()\">Login</button>\n\t    </form>\n    </div><!-- /card-container -->\n</div><!-- /container -->\n"

/***/ }),

/***/ 267:
/***/ (function(module, exports) {

module.exports = "<app-nav-bar></app-nav-bar>\n<div class=\"background-image\"></div>\n    <div class=\"container-fluid\">\n          <div class=\"card card-container\">\n              <img id=\"profile-img\" class=\"profile-img-card\" src=\"//ssl.gstatic.com/accounts/ui/avatar_2x.png\" />\n            <br />\n              <form>\n      \t      <div class=\"form-group\">\n      \t        <label class=\"label-username\" for=\"InputUsername\">Username</label>\n      \t        <input type=\"text\" required class=\"form-control\"  id=\"InputUsername\" placeholder=\"Username\" [(ngModel)]=\"newUser.username\" name=\"username\">\n      \t      </div>\n      \t      <div class=\"form-group\">\n      \t        <label class=\"label-password\" for=\"InputPassword\">Password</label>\n      \t        <input type=\"password\" required class=\"form-control\" id=\"InputPassword\" placeholder=\"Password\" [(ngModel)]=\"newUser.password\" name=\"password\">\n      \t      </div>\n      \t      <button type=\"submit\" class=\"btn btn-signin btn-default btn-primary\" (click)=\"signup()\">Create Account</button>\n      \t    </form>\n\n      </div><!-- /card-container -->\n    </div><!-- /container-fluid -->\n"

/***/ }),

/***/ 268:
/***/ (function(module, exports) {

module.exports = "<app-nav-bar></app-nav-bar>\n<div class=\"content-wrapper\">\n  <div class=\"container-fluid\">\n    <div class=\"row\">\n      <div class=\"side-left col-xs-12 col-sm-3 \">\n          <h4>Your searches:</h4>\n          <div class=\"search-tags\" *ngFor=\"let search of searches; let i=index\">\n            <a *ngIf=\"i<10\" (click)=\"searchThis(search)\">#{{search}} </a> <span (click)=\"remove(search)\" class=\"glyphicon glyphicon-remove\"></span>\n          </div><!-- search-tags -->\n      </div><!-- side-left col-xs-12 col-sm-2 -->\n      <div class=\"search-video-cont col-xs-12 col-sm-8 \">\n        <div class=\"search\">\n          <h3>search one hashtag</h3>\n          <div class=\"searchfield\">\n            <input id=\"search_tags\" placeholder=\"#ironhack\" type=\"text\" [(ngModel)]=\"searchTags\" (keyup.enter)=\"search()\" (keyup.space)=\"search()\">\n                <button class=\"search-btn\" id=\"search-button\" (click)=\"search()\">Search</button>\n        </div><!-- search -->\n\n\n          <md-radio-group [(ngModel)]=\"searchType\">\n            <div class=\"radio-buttons-wrapper\">\n              <div class=\"popular-radio\">\n                <md-radio-button class=\"radiobuttons\" value=\"popular\">Popular</md-radio-button>\n              </div><!-- popular-radio -->\n              <div class=\"trending-radio\">\n                <md-radio-button class=\"radiobuttons\" value=\"trending\">Trending</md-radio-button>\n              </div><!-- trending-radio -->\n            </div><!-- radio-buttons-wrapper -->\n          </md-radio-group>\n\n      </div>\n        <!-- YOUTUBE START -->\n        <div *ngIf=!hidden>\n          <div class=\"yt-wrapper\">\n            <div *ngIf=\"!isLoadingYt\">\n              <p>\n                loading\n              </p>\n            </div>\n            <div *ngIf=\"isLoadingYt\">\n              <app-youtube [video]=videoId (onFavorite)=\"next1($event)\" [showButtons]=true [search]=\"lastSearch\"></app-youtube>\n            </div><!-- ngif isLoading -->\n          </div><!-- yt-wrapper -->\n          <!-- YOUTUBE END -->\n          <!-- TWITTER START  -->\n          <div class=\"tweet-wrapper\">\n            <div *ngIf=\"!isLoadingTweet\">\n              <p>\n                loading\n              </p>\n            </div>\n            <div *ngIf=\"isLoadingTweet\">\n              <app-tweet [tweet]=tweet (onFavorite)=\"next1($event)\" [showButtons]=true [search]=\"lastSearch\"></app-tweet>\n            </div>\n          </div><!-- tweet-wrapper -->\n          <!-- TWITTER END  -->\n          <!-- REDDIT START -->\n          <div class=\"reddit-wrapper\">\n            <div *ngIf=\"!isLoadingReddit\">\n              <p>\n                loading\n              </p>\n            </div>\n            <div *ngIf=\"isLoadingReddit\">\n              <app-reddit [reddit]=reddit (onFavorite)=\"next1($event)\" [showButtons]=true [search]=\"lastSearch\"></app-reddit>\n            </div>\n          </div><!-- reddit-wrapper -->\n          <!-- REDDIT END -->\n          <!-- TUMBLR START -->\n          <div class=\"tumblr-wrapper\">\n            <div *ngIf=\"!isLoadingTumblr\">\n              <p>\n                loading\n              </p>\n            </div>\n            <div *ngIf=\"isLoadingTumblr\">\n              <app-tumblr [tumblr]=tumblr (onFavorite)=\"next1($event)\" [showButtons]=true [search]=\"lastSearch\"></app-tumblr>\n            </div><!-- isloadingTumblr -->\n          </div><!-- tumblr-wrapper -->\n          <!-- TUMBLR END -->\n        </div><!-- *ngIf hidden -->\n      </div><!-- col-xs-12 col-md-10 -->\n      <!-- END middle section, search and video content starts here -->\n      <!-- RIGHT SIDEBAR -->\n      <div class=\"col-xs-12 col-sm-3\">\n        <div  *ngIf=\"tagReady\" class=\"popular-tags\">\n            <div class=\"tags-wrapper\">\n            <h4>Trending tags:</h4>\n            <div class=\"tag-control\">\n              <span class=\"glyphicon glyphicon-triangle-left\" (click)=\"slide(tagCounter, minus)\"></span>\n              <span class=\"glyphicon glyphicon-triangle-right\" (click)=\"slide(tagCounter, plus)\"></span>\n            </div>\n            </div>\n          <div class=\"search-tags\" *ngFor=\"let tag of tags | tag:tagCounter.currentMin:tagCounter.currentMax; let i=index\">\n            <a (click)=\"searchThis(tag.name.substring(1))\">{{tag.name}}</a>\n          </div>\n        </div><!-- popular-tag -->\n\n        <div *ngIf=\"pubReady\" class=\"popular-tags\">\n          <div class=\"tags-wrapper\">\n            <div class=\"\">\n              <h4>Most popular tags:</h4>\n            </div>\n            <div class=\"tag-control\">\n              <span class=\"glyphicon glyphicon-triangle-left\" (click)=\"slide(popularCounter, minus)\"></span>\n              <span class=\"glyphicon glyphicon-triangle-right\" (click)=\"slide(popularCounter, plus)\"></span>\n            </div>\n          </div>\n\n            <div  class=\"search-tags\" *ngFor=\"let pop of popular | tag:popularCounter.currentMin:popularCounter.currentMax; let i=index\">\n              <a (click)=\"searchThis(pop.substring(1))\">{{pop}}</a>\n            </div>\n\n        </div><!-- popular-tags -->\n      </div><!-- col-xs-12 col-sm-2 -->\n      <!-- END RIGHT SIDEBAR -->\n    </div><!-- row -->\n  </div><!-- container -->\n</div><!-- content-wrapper -->\n"

/***/ }),

/***/ 269:
/***/ (function(module, exports) {

module.exports = "<div class=\"background-image\"></div><!-- background-image -->\n<div class=\"content-center\">\n        <div class=\"content-1\">\n          <a [routerLink]=\"['/content']\">\n            <h1 class=\"header\">Content<strong>Hub</strong></h1></a>\n        </div><!-- / content-center -->\n\n    <div class=\"phone-images-wrapper\">\n      <div class=\"row\">\n        <div class=\"col-xs-12 col-sm-5 phone-cont\">\n          <img class=\"phone-1\" src=\"../assets/images/iPhone3.png\" alt=\"iPhone\">\n        </div>\n        <div class=\"col-xs-12 col-sm-7 phone-description\">\n          <h2 class=\"description-header\">Create and share your Content<strong>Hub</strong></h2>\n          <div class=\"description-wrapper\">\n            <p class=\"description-para\">Search for content on the most popular platforms, save them with a swipe and share your Content<strong>Hub</strong> with friends.</p>\n          </div>\n          <div class=\"signup-box\">\n            <h4><a [routerLink]=\"['/signup']\">Create an account</a></h4>\n            <p> or <a [routerLink]=\"['/login']\">Login</a></p>\n          </div>\n        </div>\n      </div>\n    </div><!-- / phone-images -->\n</div><!-- / input-group -->\n"

/***/ }),

/***/ 270:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default navbar-fixed-top\">\n\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#myNavbar\">\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\" [routerLink]=\"['/content']\">Content<strong>Hub</strong></a>\n    </div>\n    <div class=\"collapse navbar-collapse\" id=\"myNavbar\">\n\n      <ul class=\"nav navbar-nav navbar-right\">\n\n        <li *ngIf=\"!this.session.isAuth\"><a [routerLink]=\"['/signup']\"><span class=\"glyphicon glyphicon-user\"></span> Sign Up</a></li>\n        <li *ngIf=\"!this.session.isAuth\"><a [routerLink]=\"['/login']\"><span class=\"glyphicon glyphicon-log-in\"></span> Login</a></li>\n        <li *ngIf=\"this.session.isAuth\"><a (click)=\"logout()\"><span class=\"glyphicon glyphicon-log-out\"></span> Logout</a></li>\n        <li *ngIf=\"this.session.isAuth\"><a [routerLink] =\"['/dashboard']\"><span class=\"glyphicon glyphicon-pushpin\"></span> My dashboard</a></li>\n\n      </ul>\n    </div>\n\n</nav>\n"

/***/ }),

/***/ 271:
/***/ (function(module, exports) {

module.exports = "\n<div class=\"swipe-container\"  (swipeleft)=\"swipe($event.type)\" (swiperight)=\"swipe($event.type)\">\n  <div class=\"reddit-content-wrapper\">\n    <div class=\"reddit-title\">\n      <h4 class=\"title\"><a target=\"_blank\" href=\"https://reddit.com/{{reddit.data.permalink}}\">{{reddit.data.title}}\n      </a></h4>\n    </div>\n\n    <div class=\"reddit-info-wrapper\">\n      <div class=\"reddit-pic-wrapper\">\n        <a href=\"{{reddit.data.url}}\" target=\"_blank\">\n          <img *ngIf=\"reddit.data.thumbnail == 'self'\" class=\"pic\" src=\"/assets/images/reddit.png\" />\n          <img *ngIf=\"reddit.data.thumbnail != 'self'\" class=\"pic\" [src]=\"reddit.data.thumbnail | safe\" >\n          <!-- <iframe [src]=\"'https://www.youtube.com/embed/' + video | safe\"  width=\"560\" height=\"315\" allowfullscreen></iframe> -->\n        </a>\n      </div><!-- reddit-pic-wrapper -->\n      <div class=\"reddit-text\">\n\n        <p class=\"reddit-author\"><!-- reddit-author -->\n          submitted by <a target=\"_blank\" href=\"https://reddit.com/u/{{reddit.data.author}}\">{{reddit.data.author}} </a>\n          to <a target=\"_blank\" href=\"https://reddit.com/{{reddit.data.subreddit_name_prefixed}}\">{{reddit.data.subreddit_name_prefixed}}</a>\n          on {{reddit.data.created * 1000 | date}}</p>\n          <p>Score: <strong>{{reddit.data.score}}</strong></p>\n          <!-- subreddit-name -->\n\n        </div><!-- reddit-text -->\n      </div><!-- reddit-info-wrapper -->\n    </div><!-- reddi-content-wrapper -->\n    <div class=\"icon-wrapper\" *ngIf=\"showButtons\">\n      <img (click)=\"onQuote()\" class=\"icon\" src=\"./assets/images/icons/005-arrows-4.png\" alt=\"nahh\">\n      <img (click)=\"save(reddit)\" class=\"icon\" src=\"./assets/images/icons/008-heart.png\" alt=\"save to dashboard\">\n    </div>\n  </div>\n"

/***/ }),

/***/ 272:
/***/ (function(module, exports) {

module.exports = "<div class=\"swipe-container\"  (swipeleft)=\"swipe($event.type)\" (swiperight)=\"swipe($event.type)\">\n\n<div class=\"title\">\n  {{tumblr.summary}}\n</div><!-- title -->\n<div class=\"text\">\n  {{tumblr.text}}\n</div>\n\n<div class=\"tumblr-wrapper\">\n  <div class=\"content-image\">\n    <a target= \"_blank\" href=\"{{tumblr.photos[0].alt_sizes[3].url}}\">\n      <img src=\"{{tumblr.photos[0].alt_sizes[3].url}}\" alt=\"small_image\">\n    </a>\n  </div>\n  <div class=\"content-wrapper\">\n    <div class=\"tumblr-blog\">\n      seen on tumblr: <a target= \"_blank\" href=\"https://{{tumblr.blog_name}}.tumblr.com\">{{tumblr.blog_name}}</a>\n    </div>\n    <div class=\"date\">\n      <a href=\"{{tumblr.short_url}}\">{{tumblr.timestamp * 1000 | date}}</a>\n    </div>\n  </div><!-- content-wrapper -->\n</div><!-- tumblr-wrapper -->\n\n\n\n<div class=\"icon-wrapper\" *ngIf=\"showButtons\">\n  <img (click)=\"onQuote()\" class=\"icon\" src=\"./assets/images/icons/005-arrows-4.png\" alt=\"nahh\">\n  <img (click)=\"save(tumblr)\" class=\"icon\" src=\"./assets/images/icons/008-heart.png\" alt=\"save to dashboard\">\n</div>\n</div>\n"

/***/ }),

/***/ 273:
/***/ (function(module, exports) {

module.exports = "<div class=\"swipe-container\"  (swipeleft)=\"swipe($event.type)\" (swiperight)=\"swipe($event.type)\">\n  <div class=\"tweet-wrapper container-fluid\">\n    <div class=\"row\">\n        <div class=\"right-tweet-content col-xs-12 col-sm-12\">\n              <div class=\"username-date-wrapper\">\n                <img class=\"twitter-pic\" src=\"{{tweet['user'].profile_image_url}}\" >\n                <p class=\"twitter-username\"><a target= \"_blank\" href=\"https://twitter.com/{{this.tweet['user'].screen_name}}\"> {{tweet[\"user\"].name}} </a></p>\n                <p class=\"twitter-handle\">@{{tweet[\"user\"].screen_name }} </p>\n                <br>\n                <a class=\"date\" target= \"_blank\" href=\"https://twitter.com/{{this.tweet['user'].id_str}}/status/{{this.tweet['id_str']}}\">{{tweet[\"created_at\"] | date}}</a>\n              </div><!-- username-date-wrapper -->\n\n              <div class=\"twitter-tweet\" [innerHTML]= \"tweet['text'] | twitter\">\n              </div><!-- twitter-tweet -->\n        </div><!-- right-tweet-content col-xs-10 col-sm-10 -->\n      </div><!-- row -->\n  </div><!-- tweet-wrapper -->\n\n\n\n  <div class=\"icon-wrapper\" *ngIf=\"showButtons\">\n    <img (click)=\"onQuote()\" class=\"icon\" src=\"./assets/images/icons/005-arrows-4.png\" alt=\"nahh\">\n    <img (click)=\"save(tweet)\" class=\"icon\" src=\"./assets/images/icons/008-heart.png\" alt=\"save to dashboard\">\n  </div>\n</div>\n"

/***/ }),

/***/ 274:
/***/ (function(module, exports) {

module.exports = "<p>\n  user works!\n</p>\n"

/***/ }),

/***/ 275:
/***/ (function(module, exports) {

module.exports = "\n<div class=\"swipe-container\"  (swipeleft)=\"swipe($event.type)\" (swiperight)=\"swipe($event.type)\">\n  <iframe [src]=\"'https://www.youtube.com/embed/' + video | safe\"  width=\"560\" height=\"315\" allowfullscreen></iframe>\n\n  <div class=\"icon-wrapper\" *ngIf=\"showButtons\">\n    <img (click)=\"onQuote()\" class=\"icon\" src=\"./assets/images/icons/005-arrows-4.png\" alt=\"nahh\">\n    <img (click)=\"save(video)\" class=\"icon\" src=\"./assets/images/icons/008-heart.png\" alt=\"save to dashboard\">\n\n  </div>\n\n</div>\n"

/***/ }),

/***/ 528:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(163);


/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_session_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__(90);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DashboardComponent = (function () {
    function DashboardComponent(session, router, dialog) {
        this.session = session;
        this.router = router;
        this.dialog = dialog;
        this.visible = true;
        this.filtered = undefined;
        this.autocompleteItems = [];
        this.favoritesData = [];
    }
    DashboardComponent.prototype.onItemAdded = function (event) {
        if (typeof (this.filtered) == "undefined")
            this.filtered = [];
        this.filtered.push(event.value.substring(1));
    };
    DashboardComponent.prototype.onItemRemoved = function (event) {
        console.log(event.value);
        this.filtered = this.filtered.filter(function (elem) { return elem != event.value.substring(1); });
        if (this.filtered.length < 1)
            this.filtered = undefined;
    };
    DashboardComponent.prototype.remove = function (id, index) {
        var _this = this;
        this.session.removeContent({ contentId: id }).subscribe(function (result) {
            _this.favoritesData.splice(index, 1);
        });
    };
    DashboardComponent.prototype.generateFavs = function () {
        var _this = this;
        this.favorites = this.session.getFavorites();
        this.favorites.forEach(function (favorite) {
            _this.session.getFavorite(favorite).subscribe(function (result) {
                _this.favoritesData.push(result);
            });
        });
    };
    DashboardComponent.prototype.ngOnInit = function () {
        this.user = this.session;
        this.favorites = this.session.getFavorites();
        this.generateFavs();
        this.searches = this.session.getSearches();
        this.autocompleteItems = this.searches.map(function (elem) { return "#" + elem; });
    };
    DashboardComponent.prototype.delete = function () {
        this.visible = false;
    };
    DashboardComponent.prototype.yes = function () {
        var _this = this;
        this.session.delete().subscribe(function () {
            _this.session.logout();
        });
    };
    DashboardComponent.prototype.no = function () {
        this.visible = true;
    };
    DashboardComponent.prototype.removeTag = function (query) {
        var _this = this;
        this.session.removeSearch({ search: query }).subscribe(function (result) {
            _this.searches = _this.session.getSearches();
            _this.autocompleteItems = _this.searches.map(function (elem) { return "#" + elem; });
        });
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-dashboard',
        template: __webpack_require__(263),
        styles: [__webpack_require__(241)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_session_service__["a" /* SessionService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_material__["g" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_material__["g" /* MdDialog */]) === "function" && _c || Object])
], DashboardComponent);

var _a, _b, _c;
//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_session_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(31);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    function LoginComponent(session, router) {
        this.session = session;
        this.router = router;
        this.user = {
            username: '',
            password: ''
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.session.login(this.user)
            .subscribe(function (result) {
            if (result === true)
                _this.router.navigate(['/content']);
            else
                _this.error = 'Username or password is incorrect';
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-login',
        template: __webpack_require__(266),
        styles: [__webpack_require__(244)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_session_service__["a" /* SessionService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object])
], LoginComponent);

var _a, _b;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_session_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(31);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SignupComponent = (function () {
    function SignupComponent(session, router) {
        this.session = session;
        this.router = router;
        this.newUser = {
            username: '',
            password: ''
        };
    }
    SignupComponent.prototype.ngOnInit = function () {
    };
    SignupComponent.prototype.signup = function () {
        var _this = this;
        this.session.signup(this.newUser)
            .subscribe(function (result) {
            if (result === true) {
                console.log('result ok', result);
                _this.session.login(_this.newUser)
                    .subscribe(function (result) {
                    if (result === true)
                        _this.router.navigate(['/content']);
                    else
                        _this.error = 'something went wrong';
                });
            }
            else
                console.log('result ko', result);
        });
    };
    return SignupComponent;
}());
SignupComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-signup',
        template: __webpack_require__(267),
        styles: [__webpack_require__(245)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_session_service__["a" /* SessionService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object])
], SignupComponent);

var _a, _b;
//# sourceMappingURL=signup.component.js.map

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_session_service__ = __webpack_require__(15);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContentComponent = (function () {
    function ContentComponent(session) {
        this.session = session;
        this.lastSearch = "";
        this.searchTags = "";
        this.tagReady = false;
        this.pubReady = false;
        this.tagCounter = {
            max: 40,
            currentMin: 0,
            currentMax: 10
        };
        this.popularCounter = {
            max: 100,
            currentMin: 0,
            currentMax: 10,
        };
        this.videoId = "";
        this.tweet = "";
        this.searchType = "popular";
        this.index = 0;
        this.indexVideo = 0;
        this.indexTwitter = 0;
        this.indexTumblr = 0;
        this.indexReddit = 0;
        this.hidden = true;
        this.isLoadingTweet = false;
        this.isLoadingYt = false;
        this.isLoadingReddit = false;
        this.isLoadingTumblr = false;
    }
    ContentComponent.prototype.searchThis = function (name) {
        console.log(name);
        this.searchTags = name;
        this.search();
    };
    ContentComponent.prototype.slide = function (tagtype, sign) {
        if (sign == "plus") {
            if (tagtype.currentMax + 5 >= tagtype.max) {
                tagtype.currentMax = 5;
                tagtype.currentMin = 0;
            }
            else {
                tagtype.currentMax += 5;
                tagtype.currentMin += 5;
            }
        }
        else {
            if (tagtype.currentMin - 5 <= 0) {
                tagtype.currentMax = tagtype.max;
                tagtype.currentMin = tagtype.max - 5;
            }
            else {
                tagtype.currentMax -= 5;
                tagtype.currentMin -= 5;
            }
        }
    };
    ContentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.session.getTags().subscribe(function (result) {
            _this.tags = result.filter(function (elem) {
                if (elem.name[0] == "#") {
                    var test = elem.name.substring(1).replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, "");
                    if (test.length > 1)
                        return elem;
                }
            });
            _this.tagCounter = {
                max: _this.tags.length,
                currentMin: 0,
                currentMax: 5
            };
            _this.tagReady = true;
        });
        this.session.getPopular().subscribe(function (result) {
            _this.popular = result.reverse();
            _this.popularCounter = {
                max: _this.popular.length,
                currentMin: 0,
                currentMax: 5
            };
            _this.pubReady = true;
        });
        this.searches = this.session.getSearches();
    };
    ContentComponent.prototype.search = function () {
        var _this = this;
        if (this.searchTags != "") {
            if (this.searchTags[0] == "#")
                this.searchTags = this.searchTags.slice(1);
            this.searchTags = this.searchTags.trim();
            this.lastSearch = this.searchTags;
            this.isLoadingTweet = false;
            this.isLoadingYt = false;
            this.isLoadingReddit = false;
            this.isLoadingTumblr = false;
            this.index = 0;
            this.session.saveSearch({ search: this.searchTags }).subscribe(function (result) {
                console.log(result);
                _this.searches = _this.session.getSearches();
            });
            this.session.searchYoutube({ search: this.searchTags, type: this.searchType }).subscribe(function (result) {
                _this.result = result.items;
                if (_this.result.length > 0) {
                    _this.videoId = _this.result[_this.index].id.videoId;
                    _this.isLoadingYt = true;
                }
            });
            this.session.searchTwitter({ hashtag: this.searchTags, type: this.searchType }).subscribe(function (result) {
                _this.tweets = result.statuses;
                if (_this.tweets.length > 0) {
                    _this.tweet = _this.tweets[_this.index];
                    _this.isLoadingTweet = true;
                }
            });
            this.session.searchReddit({ hashtag: this.searchTags, type: this.searchType }).subscribe(function (result) {
                _this.redditPosts = result.data.children;
                if (_this.redditPosts.length > 0) {
                    _this.reddit = _this.redditPosts[_this.index];
                    _this.isLoadingReddit = true;
                }
            });
            this.session.searchTumblr({ hashtag: this.searchTags, type: this.searchType }).subscribe(function (result) {
                _this.tumblrPosts = result.response;
                if (_this.tumblrPosts.length > 0) {
                    _this.tumblr = _this.tumblrPosts[_this.index];
                    _this.isLoadingTumblr = true;
                }
            });
            this.searchTags = "";
            this.hidden = false;
        }
    };
    ContentComponent.prototype.next = function () {
        this.index++;
        if (this.index >= this.tweets.length - 1)
            this.index = 0;
        this.videoId = this.result[this.index].id.videoId;
        this.tweet = this.tweets[this.index];
        this.reddit = this.redditPosts[this.index];
        this.tumblr = this.tumblrPosts[this.index];
    };
    ContentComponent.prototype.next1 = function (type) {
        if (type == "video") {
            this.indexVideo++;
            if (this.indexVideo >= this.result.length - 1)
                this.indexVideo = 0;
            this.videoId = this.result[this.indexVideo].id.videoId;
        }
        if (type == "tweet") {
            this.indexTwitter++;
            if (this.indexTwitter >= this.tweets.length - 1)
                this.indexTwitter = 0;
            this.tweet = this.tweets[this.indexTwitter];
        }
        if (type == "reddit") {
            this.indexReddit++;
            if (this.indexReddit >= this.redditPosts.length - 1)
                this.indexReddit = 0;
            this.reddit = this.redditPosts[this.indexReddit];
        }
        if (type == "tumblr") {
            this.indexTumblr++;
            if (this.indexTumblr >= this.tumblrPosts.length - 1)
                this.indexTumblr = 0;
            this.tumblr = this.tumblrPosts[this.indexTumblr];
        }
    };
    ContentComponent.prototype.remove = function (query) {
        var _this = this;
        this.session.removeSearch({ search: query }).subscribe(function (result) {
            _this.searches = _this.session.getSearches();
        });
    };
    return ContentComponent;
}());
ContentComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-content',
        template: __webpack_require__(268),
        styles: [__webpack_require__(246)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_session_service__["a" /* SessionService */]) === "function" && _a || Object])
], ContentComponent);

var _a;
//# sourceMappingURL=content.component.js.map

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndexComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var IndexComponent = (function () {
    function IndexComponent() {
    }
    IndexComponent.prototype.ngOnInit = function () {
    };
    return IndexComponent;
}());
IndexComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-index',
        template: __webpack_require__(269),
        styles: [__webpack_require__(247)]
    }),
    __metadata("design:paramtypes", [])
], IndexComponent);

//# sourceMappingURL=index.component.js.map

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UserComponent = (function () {
    function UserComponent() {
    }
    UserComponent.prototype.ngOnInit = function () {
    };
    return UserComponent;
}());
UserComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-user',
        template: __webpack_require__(274),
        styles: [__webpack_require__(252)]
    }),
    __metadata("design:paramtypes", [])
], UserComponent);

//# sourceMappingURL=user.component.js.map

/***/ })

},[528]);
//# sourceMappingURL=main.bundle.js.map