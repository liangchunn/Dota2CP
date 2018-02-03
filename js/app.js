// /* jshint shadow:true */
var DotaPickerApp = {
  VERSION: "3.3.2",
  initialized: false,
  init: function(data) {
    //instanceName
    this.instanceName = "DotaPickerApp"; //!important
    //JSON data
    this.data = data;

    //Used to display counterpicks
    this.outputHeroes = {};

    //Used to track heroes added by the user
    this.addedHeroes = {};

    this.picks = 0;
    this.heroes = [
      "abaddon",
      "alchemist",
      "ancient-apparition",
      "anti-mage",
      "arc-warden",
      "axe",
      "bane",
      "batrider",
      "beastmaster",
      "bloodseeker",
      "bounty-hunter",
      "brewmaster",
      "bristleback",
      "broodmother",
      "centaur-warrunner",
      "chaos-knight",
      "chen",
      "clinkz",
      "clockwerk",
      "crystal-maiden",
      "dark-seer",
      "dark-willow",
      "dazzle",
      "death-prophet",
      "disruptor",
      "doom",
      "dragon-knight",
      "drow-ranger",
      "earth-spirit",
      "earthshaker",
      "elder-titan",
      "ember-spirit",
      "enchantress",
      "enigma",
      "faceless-void",
      "gyrocopter",
      "huskar",
      "invoker",
      "io",
      "jakiro",
      "juggernaut",
      "keeper-of-the-light",
      "kunkka",
      "legion-commander",
      "leshrac",
      "lich",
      "lifestealer",
      "lina",
      "lion",
      "lone-druid",
      "luna",
      "lycan",
      "magnus",
      "medusa",
      "meepo",
      "mirana",
      "monkey-king",
      "morphling",
      "naga-siren",
      "natures-prophet",
      "necrophos",
      "night-stalker",
      "nyx-assassin",
      "ogre-magi",
      "omniknight",
      "oracle",
      "outworld-devourer",
      "pangolier",
      "phantom-assassin",
      "phantom-lancer",
      "phoenix",
      "puck",
      "pudge",
      "pugna",
      "queen-of-pain",
      "razor",
      "riki",
      "rubick",
      "sand-king",
      "shadow-demon",
      "shadow-fiend",
      "shadow-shaman",
      "silencer",
      "skywrath-mage",
      "slardar",
      "slark",
      "sniper",
      "spectre",
      "spirit-breaker",
      "storm-spirit",
      "sven",
      "techies",
      "templar-assassin",
      "terrorblade",
      "tidehunter",
      "timbersaw",
      "tinker",
      "tiny",
      "treant-protector",
      "troll-warlord",
      "tusk",
      "underlord",
      "undying",
      "ursa",
      "vengeful-spirit",
      "venomancer",
      "viper",
      "visage",
      "warlock",
      "weaver",
      "windranger",
      "winter-wyvern",
      "witch-doctor",
      "wraith-king",
      "zeus"
    ];
    this.heroString = {
      abaddon: "Abaddon",
      alchemist: "Alchemist",
      "ancient-apparition": "Ancient Apparition",
      "anti-mage": "Anti Mage",
      "arc-warden": "Arc Warden",
      axe: "Axe",
      bane: "Bane",
      batrider: "Batrider",
      beastmaster: "Beastmaster",
      bloodseeker: "Bloodseeker",
      "bounty-hunter": "Bounty Hunter",
      brewmaster: "Brewmaster",
      bristleback: "Bristleback",
      broodmother: "Broodmother",
      "centaur-warrunner": "Centaur Warrunner",
      "chaos-knight": "Chaos Knight",
      chen: "Chen",
      clinkz: "Clinkz",
      clockwerk: "Clockwerk",
      "crystal-maiden": "Crystal Maiden",
      "dark-seer": "Dark Seer",
      dazzle: "Dazzle",
      "death-prophet": "Death Prophet",
      disruptor: "Disruptor",
      doom: "Doom",
      "dragon-knight": "Dragon Knight",
      "drow-ranger": "Drow Ranger",
      "earth-spirit": "Earth Spirit",
      earthshaker: "Earthshaker",
      "elder-titan": "Elder Titan",
      "ember-spirit": "Ember Spirit",
      enchantress: "Enchantress",
      enigma: "Enigma",
      "faceless-void": "Faceless Void",
      gyrocopter: "Gyrocopter",
      huskar: "Huskar",
      invoker: "Invoker",
      io: "Io",
      jakiro: "Jakiro",
      juggernaut: "Juggernaut",
      "keeper-of-the-light": "Keeper Of The Light",
      kunkka: "Kunkka",
      "legion-commander": "Legion Commander",
      leshrac: "Leshrac",
      lich: "Lich",
      lifestealer: "Lifestealer",
      lina: "Lina",
      lion: "Lion",
      "lone-druid": "Lone Druid",
      luna: "Luna",
      lycan: "Lycan",
      magnus: "Magnus",
      medusa: "Medusa",
      meepo: "Meepo",
      mirana: "Mirana",
      "monkey-king": "Monkey King",
      morphling: "Morphling",
      "naga-siren": "Naga Siren",
      "natures-prophet": "Natures Prophet",
      necrophos: "Necrophos",
      "night-stalker": "Night Stalker",
      "nyx-assassin": "Nyx Assassin",
      "ogre-magi": "Ogre Magi",
      omniknight: "Omniknight",
      oracle: "Oracle",
      "outworld-devourer": "Outworld Devourer",
      "phantom-assassin": "Phantom Assassin",
      "phantom-lancer": "Phantom Lancer",
      phoenix: "Phoenix",
      puck: "Puck",
      pudge: "Pudge",
      pugna: "Pugna",
      "queen-of-pain": "Queen Of Pain",
      razor: "Razor",
      riki: "Riki",
      rubick: "Rubick",
      "sand-king": "Sand King",
      "shadow-demon": "Shadow Demon",
      "shadow-fiend": "Shadow Fiend",
      "shadow-shaman": "Shadow Shaman",
      silencer: "Silencer",
      "skywrath-mage": "Skywrath Mage",
      slardar: "Slardar",
      slark: "Slark",
      sniper: "Sniper",
      spectre: "Spectre",
      "spirit-breaker": "Spirit Breaker",
      "storm-spirit": "Storm Spirit",
      sven: "Sven",
      techies: "Techies",
      "templar-assassin": "Templar Assassin",
      terrorblade: "Terrorblade",
      tidehunter: "Tidehunter",
      timbersaw: "Timbersaw",
      tinker: "Tinker",
      tiny: "Tiny",
      "treant-protector": "Treant Protector",
      "troll-warlord": "Troll Warlord",
      tusk: "Tusk",
      underlord: "Underlord",
      undying: "Undying",
      ursa: "Ursa",
      "vengeful-spirit": "Vengeful Spirit",
      venomancer: "Venomancer",
      viper: "Viper",
      visage: "Visage",
      warlock: "Warlock",
      weaver: "Weaver",
      windranger: "Windranger",
      "winter-wyvern": "Winter Wyvern",
      "witch-doctor": "Witch Doctor",
      "wraith-king": "Wraith King",
      zeus: "Zeus",
      pangolier: "Pangolier",
      "dark-willow": "Dark Willow"
    };

    this.heroesLength = this.heroes.length;

    //Used to control how many good/bad picks in the list
    this.listElements = 5;

    //reset button
    $("#resetbutton").attr("onclick", this.instanceName + ".resetApp();");

    //list element cofig
    var options = {
      valueNames: [
        "item",
        {
          name: "eventHandler",
          attr: "onclick"
        }
      ]
    };
    //list element init
    var list = new List("heroList", options);

    //add heroes to list
    for (var x = 0; x < this.heroesLength; x++) {
      list.add({
        item:
          "<div class='item-media' id='selector-" +
          this.heroes[x] +
          "'><i class='icon'>" +
          "<span class='hero-icon hero-icon-" +
          this.heroes[x] +
          "'></span>" +
          "</i></div>" +
          "<div class='item-inner'><div class='item-title'>" +
          this.heroString[this.heroes[x]] +
          "</div></div>",
        eventHandler: this.instanceName + ".addHero('" + this.heroes[x] + "');"
      });
    }

    //update date
    $("#date").html(data["last-updated"]);

    //update VERSION
    $("#version").html(this.VERSION + " (" + data["patch-version"] + ")");

    //search clear button
    $("#searchclear").click(function() {
      $("#searchinput")
        .val("")
        .focus();
      list.search();
    });

    //hide the first prototype element
    //should find out a way to remove this and use dynamic list items instead?
    //or just change to Framework7's search function
    $(".list li")
      .first()
      .hide();

    //updateView...
    this.updateView();
  },
  addHero: function(hero) {
    var property;

    //animate list item
    $("#selector-" + hero)
      .parent()
      .parent()
      .animate(
        {
          height: "0px",
          opacity: 0
        },
        200
      );

    //Check if hero is already added
    if (!this.addedHeroes.hasOwnProperty(hero)) {
      //Create new object and set to 1 (already exist)
      this.addedHeroes[hero] = 1;
      this.picks++;

      for (var y = 0; y < this.heroesLength; y++) {
        for (property in this.data[hero][y]) {
          //Check if hero in outputHeroes does not exist
          if (!this.outputHeroes.hasOwnProperty(property)) {
            this.outputHeroes[property] = this.data[hero][y][property] * -1;
          } else {
            //if it exists, add the percentages.
            this.outputHeroes[property] += this.data[hero][y][property] * -1;
          }
        }
      }
    }

    this.updateView();
  },
  removeHero: function(hero) {
    var property;

    //update list element
    $("#selector-" + hero)
      .parent()
      .parent()
      .animate(
        {
          height: "100%",
          opacity: 1
        },
        300
      );

    //Remove from addedHeroes
    for (property in this.addedHeroes) {
      if (property === hero && this.addedHeroes[hero] === 1) {
        delete this.addedHeroes[hero];
      }
    }

    for (var y = 0; y < this.heroesLength; y++) {
      for (property in this.data[hero][y]) {
        if (this.outputHeroes.hasOwnProperty(property)) {
          this.outputHeroes[property] -= this.data[hero][y][property] * -1;
          if (
            this.outputHeroes[property] === 0 ||
            this.outputHeroes[property].toFixed(3) === 0.0
          ) {
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
        placeholder +=
          "<button href='#' class='buttonCustom' onclick='" +
          this.instanceName +
          '.removeHero("' +
          property +
          "\");'><span class='hero-icon hero-icon-" +
          property +
          "'></span></button>";
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
        heroName = this.heroString[outputHeroesArray[x][0]];
        heroAdvantage = outputHeroesArray[x][1].toFixed(3);
        color = this.getColor(heroAdvantage);
        if (this.addedHeroes[outputHeroesArray[x][0]] !== 1) {
          output += "<div class='row' style='color:" + color + ";'>";
          output +=
            "<div class='col-50'>" +
            heroName +
            "</div><div class='col-50'>+" +
            heroAdvantage +
            "</div>";
          output += "</div>";
        }
      }

      for (
        var y = outputHeroesArray.length - this.listElements;
        y < outputHeroesArray.length;
        y++
      ) {
        heroName = this.heroString[outputHeroesArray[y][0]];
        heroAdvantage = outputHeroesArray[y][1].toFixed(3);
        color = this.getColor(heroAdvantage);
        if (this.addedHeroes[outputHeroesArray[y][0]] !== 1) {
          output += "<div class='row' style='color:" + color + ";'>";
          output +=
            "<div class='col-50'>" +
            heroName +
            "</div><div class='col-50'>" +
            heroAdvantage +
            "</div>";
          output += "</div>";
        }
      }
      output += "</div>";
    }

    //jQuery magic
    $("#counterpick-field").html(output);
    $(".description").html(this.picks + " selected");
    if (this.picks > 0) {
      $(".counterpick-label").show();
      $(".counterpick-label-description").show();
      $(".counterpick-label-none").fadeOut();
    } else {
      $(".counterpick-label-description").hide();
      $(".counterpick-label").fadeOut(300, function() {
        $(".counterpick-label-none").fadeIn(500);
      });
    }
  },
  getColor: function(value) {
    if (value > 8) {
      return "#43A047";
    } else if (value > 5) {
      return "#4CAF50";
    } else if (value > 4) {
      return "#66BB6A";
    } else if (value > 3) {
      return "#81C784";
    } else if (value > 2) {
      return "#A5D6A7";
    } else if (value > 1) {
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
      $(".list li").css({
        height: "100%",
        opacity: 1
      });
      $(".list li")
        .first()
        .hide();
      App.alert("Heroes list successfully reset!", "Reset");
    } else {
      App.alert("Nothing to reset!", "Oops");
    }
  }
};

$(document).ready(function() {
  $.getJSON("js/matchup.json", function(data) {
    //Framerwork7 init
    var App = new Framework7({
      animateNavBackIcon: true
    });

    //Export selectors engine
    var $$ = Dom7;

    //Add main View
    var mainView = App.addView(".view-main", {
      // Enable dynamic Navbar
      dynamicNavbar: true,
      // Enable Dom Cache so we can use all inline pages
      domCache: true
    });
    DotaPickerApp.init(data);
  });
});
