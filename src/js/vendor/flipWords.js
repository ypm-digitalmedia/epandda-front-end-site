(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require, exports, module);
    } else {
        root.FlipWords = factory();
    }
}(this, function(require, exports, module) {

    /*

    	flipWords.js
    	by @amelien
    	based on countUp.js

    */

    // target = id of html element or var of previously selected html element where counting occurs
    // set = the array of words you want to pick from
    // end = the value you want to arrive at
    // duration = duration of animation in seconds, default 2

    var FlipWords = function(target, set, end, duration) {

        // make sure requestAnimationFrame and cancelAnimationFrame are defined
        // polyfill for browsers without native support
        // by Opera engineer Erik Möller
        var lastTime = 0;
        var vendors = ['webkit', 'moz', 'ms', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame =
                window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }

        var self = this;
        self.version = function() { return '1.8.3'; };

        // Robert Penner's easeOutExpo
        function easeOutExpo(t, b, c, d) {
            return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
        }

        function ensureArray(x) {
            return (Object.prototype.toString.call(x) === '[object Array]');
        }

        function ensureString(x) {
            return (typeof(x) === 'string');
        }

        self.callback = function() {
            // alert(end);
            self.printValue(end);
        }

        self.initialize = function() {
            if (self.initialized) return true;
            self.d = (typeof target === 'string') ? document.getElementById(target) : target;
            if (!self.d) {
                console.error('[FlipWords] target is null or undefined', self.d);
                return false;
            }
            self.set = set;

            // error checks

            if (ensureArray(self.set) && ensureString(set[0]) && ensureString(end) && set.length > 0) {
                self.duration = Number(duration) * 1000 || 2000;
                self.countDown = (self.startVal > self.endVal);
                self.frameVal = self.startVal;
                self.initialized = true;
                return true;
            } else {
                console.error('[FlipWords] set is not an array', self.set, self.end);
                return false;
            }
        };

        // Print value to target
        self.printValue = function(value) {
            var result = value;

            if (self.d.tagName === 'INPUT') {
                this.d.value = result;
            } else if (self.d.tagName === 'text' || self.d.tagName === 'tspan') {
                this.d.textContent = result;
            } else {
                this.d.innerHTML = result;
            }
        };

        self.count = function(timestamp) {

            if (!self.startTime) { self.startTime = timestamp; }

            self.timestamp = timestamp;
            var progress = timestamp - self.startTime;
            self.remaining = self.duration - progress;


            self.frameVal = set[Math.floor(Math.random() * set.length)];

            // format and print value
            self.printValue(self.frameVal);

            // whether to continue
            if (progress < self.duration) {
                self.rAF = requestAnimationFrame(self.count);
            } else {
                if (self.callback) self.callback();
            }
        };
        // start your animation
        self.start = function(callback) {
            if (!self.initialize()) return;
            // self.callback = callback;

            self.rAF = requestAnimationFrame(self.count);
        };
        // toggles pause/resume animation
        self.pauseResume = function() {
            if (!self.paused) {
                self.paused = true;
                cancelAnimationFrame(self.rAF);
            } else {
                self.paused = false;
                delete self.startTime;
                self.duration = self.remaining;
                self.startVal = self.frameVal;
                requestAnimationFrame(self.count);
            }
        };
        // reset to startVal so animation can be run again
        self.reset = function() {
            self.paused = false;
            delete self.startTime;
            self.initialized = false;
            if (self.initialize()) {
                cancelAnimationFrame(self.rAF);
                self.printValue(self.startVal);
            }
        };
        // pass a new endVal and start animation
        self.update = function(newEndVal) {
            if (!self.initialize()) return;
            cancelAnimationFrame(self.rAF);
            self.paused = false;
            delete self.startTime;
            self.startVal = self.frameVal;
            self.endVal = Number(newEndVal);
            if (ensureNumber(self.endVal)) {
                // self.countDown = (self.startVal > self.endVal);
                self.rAF = requestAnimationFrame(self.count);
            } else {
                console.error('[FlipWords] update() - new end is not a string', newEndVal);
            }
        };

        self.setLast = function(end) {
            alert(end);
        }

        // format startVal on initialization
        if (self.initialize()) self.printValue(self.end);
    };

    return FlipWords;

}));