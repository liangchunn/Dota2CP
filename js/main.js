// Initialize your app
var DotaPickerApp = new Framework7({
    animateNavBackIcon: true
});

// Export selectors engine
var $$ = Dom7;

// Add main View
var mainView = DotaPickerApp.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: true,
    // Enable Dom Cache so we can use all inline pages
    domCache: true
});


function DotaPicker(args) {
    this.data = args.JSON;
    this.listId = args.listId;
    this.instanceName = args.instanceName;
    this.counterPickContainer = args.counterPickContainer;

    this.outputHeroes = {};
    this.addedHeroes = {};
    this.addedText = "";
    this.len = 5;
    this.text = "";
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
}


DotaPicker.prototype.addHero = function(arg) {
    // $('#_selector_' + arg).parent().parent().fadeOut();
    $('#_selector_' + arg).parent().parent().animate({
        height: '0px',
        opacity: 0
    }, 200);

    //check if the hero is already added
    if (!this.addedHeroes.hasOwnProperty(arg)) {
        //create a new object in addedHeroes and set the keypair value to 1, indicating that it's added
        //could also create an array to do this, but arrays need manual skimming using loops.
        this.addedHeroes[arg] = 1;
        this.picks++;
        // this.addedText += "<img src='icons/" + arg + ".png'/>  ";

        //get best counter heroes from JSON object
        for (var x = this.heroes.length; x > this.heroes.length - (this.len + 2); x--) {
            for (var property in this.data[arg][x]) {
                if (!this.outputHeroes.hasOwnProperty(property)) {
                    this.outputHeroes[property] = (this.data[arg][x][property] * -1);
                } else {
                    this.outputHeroes[property] += (this.data[arg][x][property] * -1);
                }
            }
        }

        //get worse counter heroes from JSON object
        for (var y = 0; y < this.len; y++) {
            for (var property in this.data[arg][y]) {
                if (!this.outputHeroes.hasOwnProperty(property)) {
                    this.outputHeroes[property] = (this.data[arg][y][property] * -1);
                } else {
                    this.outputHeroes[property] += (this.data[arg][y][property] * -1);
                }
            }
        }
        this.updateView();
    }
};

DotaPicker.prototype.removeHero = function(arg) {
    $('#_selector_' + arg).parent().parent().animate({
        height: '100%',
        opacity: 1
    }, 300);
    for (var prop in this.addedHeroes) {
        if (prop == arg && this.addedHeroes[arg] == 1) {
            delete this.addedHeroes[arg];
        }
    }

    //delete best counter heroes from JSON object
    for (var x = this.heroes.length; x > this.heroes.length - (this.len + 2); x--) {
        for (var property in this.data[arg][x]) {
            if (this.outputHeroes.hasOwnProperty(property)) {
                this.outputHeroes[property] -= (this.data[arg][x][property] * -1);
                if (this.outputHeroes[property] === 0 || this.outputHeroes[property].toFixed(3) === 0.00) {
                    delete this.outputHeroes[property];
                }
            }
        }
    }
    //delete worse counter heroes from JSON object
    for (var y = 0; y < this.len; y++) {
        for (var property in this.data[arg][y]) {
            if (this.outputHeroes.hasOwnProperty(property)) {
                this.outputHeroes[property] -= (this.data[arg][y][property] * -1);
                if (this.outputHeroes[property] === 0 || this.outputHeroes[property].toFixed(3) === 0.00) {
                    delete this.outputHeroes[property];
                }
            }
        }
    }
    this.picks--;
    this.updateView();
};

DotaPicker.prototype.updateHTMLText = function() {
    var holder = "<center>";
    for (var prop in this.addedHeroes) {
        if (this.addedHeroes[prop] == 1) {
            holder += "<button href='#' class='buttonCustom' onclick='" + this.instanceName + ".removeHero(\"" + prop + "\");'><img src='icons/" + prop + ".png'/></button>";
        }
    }
    holder += "</center>";
    this.addedText = holder;
};

DotaPicker.prototype.updateView = function() {
    var outputText = "";
    var array = [];
    var colorLength = this.len;
    var initialColor = colorLength;
    var topColor = "#4CAF50";
    var bottomColor = "#FFFF00";
    var outColor = topColor;
    //transform JSON into Array
    for (var a in this.outputHeroes) {
        array.push([a, this.outputHeroes[a]]);
    }
    array.sort(function(a, b) {
        return b[1] - a[1];
    });
    this.updateHTMLText();
    outputText += "<p>" + this.addedText + "</p>";
    outputText += "<div>";
    for (var a = 0, b; b = array[a]; ++a) {

        //set regularly used variables
        var heroName = b[0].replace(/\-/g, " ").capitalize();
        var heroAdvantage = b[1].toFixed(3);

        //check if heroAdvantage is in range, and suggested hero is not already selected
        /* TO DO:
        Optimize heroAdvantage display better results. Maybe use statistical calculations?*/
        if ((heroAdvantage > 1 || heroAdvantage < -2.5) && (this.addedHeroes[b[0]] !== 1)) {

            if (colorLength > 0 && b[1] > 0) {
                outputText += "<div class='row' style='color:" + outColor + ";'>";
                outputText += "<div class='col-50'>" + heroName + "</div><div class='col-50'>" + heroAdvantage + "</div>";
                outputText += "</div>";
                colorLength--;
                outColor = this.blendColors(topColor, bottomColor, ((a + 1) * (1 / initialColor)));
            } else {
                var negColor = (heroAdvantage < 0) ? "#F44336" : "#FFFFFF";
                outputText += "<div class='row' style='color:" + negColor + ";'>";
                outputText += "<div class='col-50'>" + heroName + "</div><div class='col-50'>" + heroAdvantage + "</div>";
                outputText += "</div>";
            }

        }
    }
    outputText += "</div>";

    $('#' + this.counterPickContainer).html(outputText);
    $('.description').html(this.picks + " selected");
    if (this.picks > 0) {
        $('.counterpick_label').show();
        $('.counterpick_label_description').show();
        $('.counterpick_label_none').fadeOut();

    } else {
        $('.counterpick_label_description').hide();
        $('.counterpick_label').fadeOut(300, function() {
            $('.counterpick_label_none').fadeIn(500);
        });
    }
};

DotaPicker.prototype.resetHeroes = function() {
    if (this.picks > 0) {
        this.outputHeroes = {};
        this.addedHeroes = {};
        this.text = "";
        this.picks = 0;
        this.addedText = "";
        this.updateView();
        $('.list li').css({
            height: '100%',
            opacity: 1
        });
        $('.list li').first().hide();
        DotaPickerApp.alert('Heroes list successfully reset!', 'Success');
    } else {
        DotaPickerApp.alert('Nothing to reset!', 'Oops');
    }
};

DotaPicker.prototype.blendColors = function(c0, c1, p) {
    var f = parseInt(c0.slice(1), 16),
        t = parseInt(c1.slice(1), 16),
        R1 = f >> 16,
        G1 = f >> 8 & 0x00FF,
        B1 = f & 0x0000FF,
        R2 = t >> 16,
        G2 = t >> 8 & 0x00FF,
        B2 = t & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((R2 - R1) * p) + R1) * 0x10000 + (Math.round((G2 - G1) * p) + G1) * 0x100 + (Math.round((B2 - B1) * p) + B1)).toString(16).slice(1);
};

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) {
        return a.toUpperCase();
    });
};

DotaPicker.prototype.generateList = function() {

    //reset list button
    $('#resetbutton').attr("onclick", this.instanceName + ".resetHeroes();");
    var options = {
        valueNames: ['item', {
            name: 'eventHandler',
            attr: 'onclick',
        }]
    };

    var newList = new List(this.listId, options);
    //add all heores to the list item
    for (var x = 0; x < this.heroes.length; x++) {
        newList.add({
            item: "<div class='item-media' id='_selector_" + this.heroes[x] + "'><i class='icon'>" + "<img src='icons/" + this.heroes[x] + ".png'/>  " + "</i></div>" + "<div class='item-inner'><div class='item-title'>" + this.heroes[x].replace(/\-/g, " ").capitalize() + "</div></div>",
            eventHandler: this.instanceName + ".addHero('" + this.heroes[x] + "');"
        });
    }



    $("#date").html(data['last-updated']);
    $("#searchclear").click(function() {
        $("#searchinput").val('').focus();
        newList.search();
    });

    //hide the first prototype element
    //should find out a way to remove this and use dynamic list items instead?
    //or just change to Framework7's search function
    $('.list li').first().hide();


};

var dp = new DotaPicker({
    JSON: data,
    instanceName: "dp",
    listId: "heroList",
    counterPickContainer: "counterpick-field"
});

$(document).ready(function() {
    dp.generateList();
    dp.updateView();
});
