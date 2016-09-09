// /* jshint shadow:true */

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) {
        return a.toUpperCase();
    });
};

var DotaPickerApp = {
    VERSION: '3.2.3',
    initialized: false,
    init: function(data) {
        //instanceName
        this.instanceName = 'DotaPickerApp'; //!important
        //JSON data
        this.data = data;

        //Used to display counterpicks
        this.outputHeroes = {};

        //Used to track heroes added by the user
        this.addedHeroes = {};

        this.picks = 0;
        this.heroes = ['abaddon', 'alchemist', 'ancient-apparition', 'anti-mage', 'arc-warden', 'axe', 'bane', 'batrider', 'beastmaster', 'bloodseeker', 'bounty-hunter', 'brewmaster', 'bristleback', 'broodmother', 'centaur-warrunner',
            'chaos-knight',
            'chen', 'clinkz', 'clockwerk', 'crystal-maiden', 'dark-seer', 'dazzle', 'death-prophet', 'disruptor', 'doom', 'dragon-knight', 'drow-ranger', 'earth-spirit', 'earthshaker', 'elder-titan', 'ember-spirit', 'enchantress', 'enigma',
            'faceless-void', 'gyrocopter', 'huskar', 'invoker', 'io', 'jakiro', 'juggernaut', 'keeper-of-the-light', 'kunkka', 'legion-commander', 'leshrac', 'lich', 'lifestealer', 'lina', 'lion', 'lone-druid', 'luna', 'lycan', 'magnus',
            'medusa', 'meepo', 'mirana', 'morphling', 'naga-siren', 'natures-prophet', 'necrophos', 'night-stalker', 'nyx-assassin', 'ogre-magi', 'omniknight', 'oracle', 'outworld-devourer', 'phantom-assassin', 'phantom-lancer', 'phoenix', 'puck', 'pudge',
            'pugna', 'queen-of-pain', 'razor', 'riki', 'rubick', 'sand-king', 'shadow-demon', 'shadow-fiend', 'shadow-shaman', 'silencer', 'skywrath-mage', 'slardar', 'slark', 'sniper', 'spectre', 'spirit-breaker', 'storm-spirit', 'sven',
            'techies', 'templar-assassin', 'terrorblade', 'tidehunter', 'timbersaw', 'tinker', 'tiny', 'treant-protector', 'troll-warlord', 'tusk', 'underlord', 'undying', 'ursa', 'vengeful-spirit', 'venomancer', 'viper', 'visage', 'warlock', 'weaver',
            'windranger', 'winter-wyvern', 'witch-doctor', 'wraith-king', 'zeus'
        ];
        this.heroesLength = this.heroes.length;

        //Used to control how many good/bad picks in the list
        this.listElements = 5;

        //reset button
        $('#resetbutton').attr("onclick", this.instanceName + ".resetApp();");

        //list element cofig
        var options = {
            valueNames: ['item', {
                name: 'eventHandler',
                attr: 'onclick',
            }]
        };
        //list element init
        var list = new List("heroList", options);

        //add heroes to list
        for (var x = 0; x < this.heroesLength; x++) {
            list.add({
                item: "<div class='item-media' id='selector-" + this.heroes[x] + "'><i class='icon'>" + "<img src='icons/" + this.heroes[x] + ".png'/>  " + "</i></div>" + "<div class='item-inner'><div class='item-title'>" + this.heroes[x].replace(/\-/g, " ").capitalize() + "</div></div>",
                eventHandler: this.instanceName + ".addHero('" + this.heroes[x] + "');"
            });
        }

        //update date
        $("#date").html(data['last-updated']);

        //update VERSION
        $("#version").html(this.VERSION);

        //search clear button
        $("#searchclear").click(function() {
            $("#searchinput").val('').focus();
            list.search();
        });


        //hide the first prototype element
        //should find out a way to remove this and use dynamic list items instead?
        //or just change to Framework7's search function
        $('.list li').first().hide();

        //updateView...
        this.updateView();
    },
    addHero: function(hero) {

        var property;

        //animate list item
        $('#selector-' + hero).parent().parent().animate({
            height: '0px',
            opacity: 0
        }, 200);

        //Check if hero is already added
        if (!this.addedHeroes.hasOwnProperty(hero)) {
            //Create new object and set to 1 (already exist)
            this.addedHeroes[hero] = 1;
            this.picks++;
        }

        //Get best counters
        for (var x = this.heroesLength; x > (this.heroesLength - (this.listElements + 2)); x--) {
            for (property in this.data[hero][x]) {
                //Check if hero in outputHeroes does not exist
                if (!this.outputHeroes.hasOwnProperty(property)) {
                    this.outputHeroes[property] = (this.data[hero][x][property] * -1);
                } else {
                    //if it exists, add the percentages.
                    this.outputHeroes[property] += (this.data[hero][x][property] * -1);
                }
            }
        }

        //Get worse counters
        for (var y = 0; y < this.heroesLength; y++) {
            for (property in this.data[hero][y]) {
                //Check if hero in outputHeroes does not exist
                if (!this.outputHeroes.hasOwnProperty(property)) {
                    this.outputHeroes[property] = (this.data[hero][y][property] * -1);
                } else {
                    //if it exists, add the percentages.
                    this.outputHeroes[property] += (this.data[hero][y][property] * -1);
                }
            }
        }

        this.updateView();
    },
    removeHero: function(hero) {

        var property;

        //update list element
        $('#selector-' + hero).parent().parent().animate({
            height: '100%',
            opacity: 1
        }, 300);

        //Remove from addedHeroes
        for (property in this.addedHeroes) {
            if (property === hero && this.addedHeroes[hero] === 1) {
                delete this.addedHeroes[hero];
            }
        }

        //Delete best counter heroes from JSON object
        for (var x = this.heroesLength; x > (this.heroesLength - (this.listElements + 2)); x--) {
            for (property in this.data[hero][x]) {
                if (this.outputHeroes.hasOwnProperty(property)) {
                    this.outputHeroes[property] -= (this.data[hero][x][property] * -1);
                    if (this.outputHeroes[property] === 0 || this.outputHeroes[property].toFixed(3) === 0.00) {
                        delete this.outputHeroes[property];
                    }
                }
            }
        }

        //Delete worse counter heroes from JSON object
        for (var y = 0; y < this.heroesLength; y++) {
            for (property in this.data[hero][y]) {
                if (this.outputHeroes.hasOwnProperty(property)) {
                    this.outputHeroes[property] -= (this.data[hero][y][property] * -1);
                    if (this.outputHeroes[property] === 0 || this.outputHeroes[property].toFixed(3) === 0.00) {
                        delete this.outputHeroes[property];
                    }
                }
            }
        }
        this.picks--;
        this.updateView();
    },
    generateHTMLButtons: function() {
        var placeholder = "<center>";
        var property;

        for (property in this.addedHeroes) {
            if (this.addedHeroes[property] === 1) {
                placeholder += "<button href='#' class='buttonCustom' onclick='" + this.instanceName + ".removeHero(\"" + property + "\");'><img src='icons/" + property + ".png'/></button>";
            }
        }
        placeholder += "</center>";

        return placeholder;
    },
    updateView: function() {

        var output = "";
        var heroName, heroAdvantage, color;

        if (this.picks > 0) {
            //Update buttons
            output += "<p>" + this.generateHTMLButtons() + "<p>";

            //Convert outputHeroes to arrays and sort accordingly
            var outputHeroesArray = this.sortByValues(this.outputHeroes);


            //Start creating list...
            output += "<div>";
            for (var x = 0; x < this.listElements + 5; x++) {
                heroName = outputHeroesArray[x][0].replace(/\-/g, " ").capitalize();
                heroAdvantage = outputHeroesArray[x][1].toFixed(3);
                color = this.getColor(heroAdvantage);
                if (this.addedHeroes[outputHeroesArray[x][0]] !== 1) {
                    output += "<div class='row' style='color:" + color + ";'>";
                    output += "<div class='col-50'>" + heroName + "</div><div class='col-50'>+" + heroAdvantage + "</div>";
                    output += "</div>";
                }
            }

            for (var y = outputHeroesArray.length - this.listElements; y < outputHeroesArray.length; y++) {
                heroName = outputHeroesArray[y][0].replace(/\-/g, " ").capitalize();
                heroAdvantage = outputHeroesArray[y][1].toFixed(3);
                color = this.getColor(heroAdvantage);
                if (this.addedHeroes[outputHeroesArray[y][0]] !== 1) {
                    output += "<div class='row' style='color:" + color + ";'>";
                    output += "<div class='col-50'>" + heroName + "</div><div class='col-50'>" + heroAdvantage + "</div>";
                    output += "</div>";
                }
            }
            output += "</div>";
        }

        //jQuery magic
        $('#counterpick-field').html(output);
        $('.description').html(this.picks + " selected");
        if (this.picks > 0) {
            $('.counterpick-label').show();
            $('.counterpick-label-description').show();
            $('.counterpick-label-none').fadeOut();

        } else {
            $('.counterpick-label-description').hide();
            $('.counterpick-label').fadeOut(300, function() {
                $('.counterpick-label-none').fadeIn(500);
            });
        }
    },
    getColor: function(value) {
        if(value > 8){
            return "#43A047";
        } else if (value > 5) {
            return "#4CAF50";
        } else if (value > 4) {
            return "#66BB6A";
        } else if (value > 3) {
            return "#81C784";
        } else if (value > 2) {
            return "#A5D6A7";
        } else if (value > 1){
            return "#C8E6C9";
        } else if (value > 0) {
            return "#FFFFFF";
        } else {
            return "#F44336";
        }
    },
    sortByValues: function(object) {
        var array = [];
        for (var a in object) {
            array.push([a, object[a]]);
        }
        array.sort(function(a, b) {
            return b[1] - a[1];
        });
        return array;
    },
    resetApp: function() {
        if (this.picks > 0) {
            this.outputHeroes = {};
            this.addedHeroes = {};
            this.picks = 0;
            this.updateView();
            $('.list li').css({
                height: '100%',
                opacity: 1
            });
            $('.list li').first().hide();
            App.alert('Heroes list successfully reset!', 'Reset');
        } else {
            App.alert('Nothing to reset!', 'Oops');
        }
    }
};


var isAndroid = Framework7.prototype.device.android === true;
var isIos = Framework7.prototype.device.ios === true;

var $$ = Dom7;

// Change Through navbar layout to Fixed
if (isAndroid) {
    // Change class
    // $$('.view.navbar-through').removeClass('navbar-through').addClass('navbar-fixed');
    // And move Navbar into Page
    // $$('.view .navbar').prependTo('.view .page');
}


//Framerwork7 init
var App = new Framework7({
    animateNavBackIcon: true,
    material: isAndroid ? true : false,
});

//Add main View
var mainView = App.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: true,
    // Enable Dom Cache so we can use all inline pages
    domCache: true
});

//DotaPickerApp init
DotaPickerApp.init(data);
