import ImageReplacer from "../ImageReplacer";
import * as fs from 'fs';

var heros = [
    [
        {
            "href": "http://www.spyrius.org/nexo/hawk-holler.html",
            "src": "http://www.spyrius.org/images/nexo-knights/hawk-holler.jpg",
            "title": "001 · Hawk Holler",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/hawk-holler.png",
            "power": [
                "/nexo/img/elements/hawk.png",
                "/nexo/img/elements/note.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/backlash-lightning.html",
            "src": "http://www.spyrius.org/images/nexo-knights/backlash-lightning.jpg",
            "title": "002 · Backlash Lightning",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/backlash-lightning.png",
            "power": [
                "/nexo/img/elements/bolt.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/stronghold-of-resolution.html",
            "src": "http://www.spyrius.org/images/nexo-knights/stronghold-of-resolution.jpg",
            "title": "003 · Stronghold of Resolution",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/stronghold-of-resolution.png",
            "power": [
                "/nexo/img/elements/hawk.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/mech-master.html",
            "src": "http://www.spyrius.org/images/nexo-knights/mech-master.jpg",
            "title": "004 · Mech Master",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/mech-master.png",
            "power": [
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/sword-tornado.html",
            "src": "http://www.spyrius.org/images/nexo-knights/sword-tornado.jpg",
            "title": "005 · Sword Tornado",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/sword-tornado.png",
            "power": [
                "/nexo/img/elements/wind.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/sea-dragon.html",
            "src": "http://www.spyrius.org/images/nexo-knights/sea-dragon.jpg",
            "title": "006 · Sea Dragon",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/sea-dragon.png",
            "power": [
                "/nexo/img/elements/dragon.png",
                "/nexo/img/elements/water.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/backfire.html",
            "src": "http://www.spyrius.org/images/nexo-knights/backfire.jpg",
            "title": "007 · Backfire",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/backfire.png",
            "power": [
                "/nexo/img/elements/weapon.png",
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/egg-of-doom.html",
            "src": "http://www.spyrius.org/images/nexo-knights/egg-of-doom.jpg",
            "title": "008 · Egg of Doom",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/egg-of-doom.png",
            "power": [
                "/nexo/img/elements/monster.png",
                "/nexo/img/elements/fork.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/croc-tears.html",
            "src": "http://www.spyrius.org/images/nexo-knights/croc-tears.jpg",
            "title": "009 · Croc Tears",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/croc-tears.png",
            "power": [
                "/nexo/img/elements/paw.png",
                "/nexo/img/elements/water.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/ice-burst.html",
            "src": "http://www.spyrius.org/images/nexo-knights/ice-burst.jpg",
            "title": "010 · Ice Burst",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/ice-burst.png",
            "power": [
                "/nexo/img/elements/snow.png",
                "/nexo/img/elements/bomb.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/dragon-of-justice.html",
            "src": "http://www.spyrius.org/images/nexo-knights/dragon-of-justice.jpg",
            "title": "011 · Dragon of Justice",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/dragon-of-justice.png",
            "power": [
                "/nexo/img/elements/dragon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/formation-of-fortitude.html",
            "src": "http://www.spyrius.org/images/nexo-knights/formation-of-fortitude.jpg",
            "title": "012 · Formation of Fortitude",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/formation-of-fortitude.png",
            "power": [
                "/nexo/img/elements/magic.png",
                "/nexo/img/elements/leaf.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/roaring-righteousness.html",
            "src": "http://www.spyrius.org/images/nexo-knights/roaring-righteousness.jpg",
            "title": "013 · Roaring Righteousness",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/roaring-righteousness.png",
            "power": [
                "/nexo/img/elements/paw.png",
                "/nexo/img/elements/note.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/order-of-the-knights-code.html",
            "src": "http://www.spyrius.org/images/nexo-knights/order-of-the-knights-code.jpg",
            "title": "014 · Order of the Knights Code",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/order-of-the-knights-code.png",
            "power": [
                "/nexo/img/elements/armor.png",
                "/nexo/img/elements/weapon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/banana-bombs.html",
            "src": "http://www.spyrius.org/images/nexo-knights/banana-bombs.jpg",
            "title": "015 · Banana Bombs",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/banana-bombs.png",
            "power": [
                "/nexo/img/elements/fork.png",
                "/nexo/img/elements/bomb.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/beam-jump.html",
            "src": "http://www.spyrius.org/images/nexo-knights/beam-jump.jpg",
            "title": "016 · Beam Jump",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/beam-jump.png",
            "power": [
                "/nexo/img/elements/armor.png",
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/rocketship.html",
            "src": "http://www.spyrius.org/images/nexo-knights/rocketship.jpg",
            "title": "017 · Rocketship",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/rocketship.png",
            "power": [
                "/nexo/img/elements/rock.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/veil-of-concealment.html",
            "src": "http://www.spyrius.org/images/nexo-knights/veil-of-concealment.jpg",
            "title": "018 · Veil of Concealment",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/veil-of-concealment.png",
            "power": [
                "/nexo/img/elements/paw.png",
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/zap-zap.html",
            "src": "http://www.spyrius.org/images/nexo-knights/zap-zap.jpg",
            "title": "019 · Zap Zap",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/zap-zap.png",
            "power": [
                "/nexo/img/elements/bolt.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/ultra-armor-activate.html",
            "src": "http://www.spyrius.org/images/nexo-knights/ultra-armor-activate.jpg",
            "title": "020 · Ultra Armor Activate",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/ultra-armor-activate.png",
            "power": [
                "/nexo/img/elements/bolt.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/broom-of-doom.html",
            "src": "http://www.spyrius.org/images/nexo-knights/broom-of-doom.jpg",
            "title": "021 · Broom of Doom",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/broom-of-doom.png",
            "power": [
                "/nexo/img/elements/wind.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/minify-surprise.html",
            "src": "http://www.spyrius.org/images/nexo-knights/minify-surprise.jpg",
            "title": "022 · Minify Suprise",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/minify-surprise.png",
            "power": [
                "/nexo/img/elements/armor.png",
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/brain-freeze.html",
            "src": "http://www.spyrius.org/images/nexo-knights/brain-freeze.jpg",
            "title": "023 · Brain Freeze",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/brain-freeze.png",
            "power": [
                "/nexo/img/elements/snow.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/whirlwind.html",
            "src": "http://www.spyrius.org/images/nexo-knights/whirlwind.jpg",
            "title": "024 · Whirlwind",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/whirlwind.png",
            "power": [
                "/nexo/img/elements/wind.png",
                "/nexo/img/elements/weapon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/giant-growth.html",
            "src": "http://www.spyrius.org/images/nexo-knights/giant-growth.jpg",
            "title": "025 · Giant Growth",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/giant-growth.png",
            "power": [
                "/nexo/img/elements/armor.png",
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/raptor-bite.html",
            "src": "http://www.spyrius.org/images/nexo-knights/raptor-bite.jpg",
            "title": "026 · Raptor Bite",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/raptor-bite.png",
            "power": [
                "/nexo/img/elements/monster.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/cool-creation.html",
            "src": "http://www.spyrius.org/images/nexo-knights/cool-creation.jpg",
            "title": "027 · Cool Creation",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/cool-creation.png",
            "power": [
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/shield-of-schooling-and-protecting.html",
            "src": "http://www.spyrius.org/images/nexo-knights/shield-of-schooling-and-protecting.jpg",
            "title": "028 · Shield of Schooling and Protection",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/shield-of-schooling-and-protecting.png",
            "power": [
                "/nexo/img/elements/hawk.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/hail-to-the-jester.html",
            "src": "http://www.spyrius.org/images/nexo-knights/hail-to-the-jester.jpg",
            "title": "029 · Hail to the Jester",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/hail-to-the-jester.png",
            "power": [
                "/nexo/img/elements/monster.png",
                "/nexo/img/elements/note.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/fireflies.html",
            "src": "http://www.spyrius.org/images/nexo-knights/fireflies.jpg",
            "title": "030 · Fireflies",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/fireflies.png",
            "power": [
                "/nexo/img/elements/fire.png",
                "/nexo/img/elements/bug.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/ship-wrecker.html",
            "src": "http://www.spyrius.org/images/nexo-knights/ship-wrecker.jpg",
            "title": "031 · Ship Wrecker",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/ship-wrecker.png",
            "power": [
                "/nexo/img/elements/water.png",
                "/nexo/img/elements/weapon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/shadow-snail.html",
            "src": "http://www.spyrius.org/images/nexo-knights/shadow-snail.jpg",
            "title": "032 · Shadow Snail",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/shadow-snail.png",
            "power": [
                "/nexo/img/elements/paw.png",
                "/nexo/img/elements/skull.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/bear-claws.html",
            "src": "http://www.spyrius.org/images/nexo-knights/bear-claws.jpg",
            "title": "033 · Bear Claws",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/bear-claws.png",
            "power": [
                "/nexo/img/elements/paw.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/water-wall.html",
            "src": "http://www.spyrius.org/images/nexo-knights/water-wall.jpg",
            "title": "034 · Water Wall",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/water-wall.png",
            "power": [
                "/nexo/img/elements/water.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/air-portal.html",
            "src": "http://www.spyrius.org/images/nexo-knights/air-portal.jpg",
            "title": "035 · Air Portal",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/air-portal.png",
            "power": [
                "/nexo/img/elements/magic.png",
                "/nexo/img/elements/wind.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/armadillo-shelter.html",
            "src": "http://www.spyrius.org/images/nexo-knights/armadillo-shelter.jpg",
            "title": "036 · Armadillo Shelter",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/armadillo-shelter.png",
            "power": [
                "/nexo/img/elements/paw.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/bone-shaker.html",
            "src": "http://www.spyrius.org/images/nexo-knights/bone-shaker.jpg",
            "title": "038 · Bone Shaker",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/bone-shaker.png",
            "power": [
                "/nexo/img/elements/note.png",
                "/nexo/img/elements/paw.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/chrome-bell.html",
            "src": "http://www.spyrius.org/images/nexo-knights/chrome-bell.jpg",
            "title": "039 · Chrome Bell",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/chrome-bell.png",
            "power": [
                "/nexo/img/elements/note.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/drop-the-beat.html",
            "src": "http://www.spyrius.org/images/nexo-knights/drop-the-beat.jpg",
            "title": "041 · Drop the Beat",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/drop-the-beat.png",
            "power": [
                "/nexo/img/elements/note.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/haunted-armor.html",
            "src": "http://www.spyrius.org/images/nexo-knights/haunted-armor.jpg",
            "title": "045 · Haunted Armor",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/haunted-armor.png",
            "power": [
                "/nexo/img/elements/monster.png",
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/hornblower.html",
            "src": "http://www.spyrius.org/images/nexo-knights/hornblower.jpg",
            "title": "046 · Hornblower",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/hornblower.png",
            "power": [
                "/nexo/img/elements/note.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/ice-cream.html",
            "src": "http://www.spyrius.org/images/nexo-knights/ice-cream.jpg",
            "title": "047 · Ice Cream",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/ice-cream.png",
            "power": [
                "/nexo/img/elements/fork.png",
                "/nexo/img/elements/snow.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/inverted-charge.html",
            "src": "http://www.spyrius.org/images/nexo-knights/inverted-charge.jpg",
            "title": "048 · Inverted Charge",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/inverted-charge.png",
            "power": [
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/iron-dragon.html",
            "src": "http://www.spyrius.org/images/nexo-knights/iron-dragon.jpg",
            "title": "049 · Iron Dragon",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/iron-dragon.png",
            "power": [
                "/nexo/img/elements/dragon.png",
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/jumperman.html",
            "src": "http://www.spyrius.org/images/nexo-knights/jumperman.jpg",
            "title": "050 · Jumperman",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/jumperman.png",
            "power": [
                "/nexo/img/elements/bomb.png",
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/powder-keg.html",
            "src": "http://www.spyrius.org/images/nexo-knights/powder-keg.jpg",
            "title": "052 · Powder Keg",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/powder-keg.png",
            "power": [
                "/nexo/img/elements/bomb.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/sir-tauntalot.html",
            "src": "http://www.spyrius.org/images/nexo-knights/sir-tauntalot.jpg",
            "title": "054 · Sir Tauntalot",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/sir-tauntalot.png",
            "power": [
                "/nexo/img/elements/sun.png",
                "/nexo/img/elements/weapon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/squeeze-wrench.html",
            "src": "http://www.spyrius.org/images/nexo-knights/squeeze-wrench.jpg",
            "title": "055 · Squeeze Wrench",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/squeeze-wrench.png",
            "power": [
                "/nexo/img/elements/weapon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/yeti-sneeze.html",
            "src": "http://www.spyrius.org/images/nexo-knights/yeti-sneeze.jpg",
            "title": "056 · Yeti Sneeze",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/yeti-sneeze.png",
            "power": [
                "/nexo/img/elements/snow.png",
                "/nexo/img/elements/water.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/ticking-baboon.html",
            "src": "http://www.spyrius.org/images/nexo-knights/ticking-baboon.jpg",
            "title": "057 · Ticking Baboon",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/ticking-baboon.png",
            "power": [
                "/nexo/img/elements/paw.png",
                "/nexo/img/elements/bomb.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/titanium-sword.html",
            "src": "http://www.spyrius.org/images/nexo-knights/titanium-sword.jpg",
            "title": "058 · Titanium Sword",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/titanium-sword.png",
            "power": [
                "/nexo/img/elements/weapon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/collapsing-crumble.html",
            "src": "http://www.spyrius.org/images/nexo-knights/collapsing-crumble.jpg",
            "title": "060 · Collapsing Crumble",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/collapsing-crumble.png",
            "power": [
                "/nexo/img/elements/wind.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/corrupting-crush.html",
            "src": "http://www.spyrius.org/images/nexo-knights/corrupting-crush.jpg",
            "title": "061 · Corrupting Crush",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/corrupting-crush.png",
            "power": [
                "/nexo/img/elements/snow.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/vicious-voltage.html",
            "src": "http://www.spyrius.org/images/nexo-knights/vicious-voltage.jpg",
            "title": "062 · Vicious Voltage",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/vicious-voltage.png",
            "power": [
                "/nexo/img/elements/sun.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/thundering-thrash.html",
            "src": "http://www.spyrius.org/images/nexo-knights/thundering-thrash.jpg",
            "title": "065 · Thundering Thrash",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/thundering-thrash.png",
            "power": [
                "/nexo/img/elements/bolt.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/wedgie-of-doom.html",
            "src": "http://www.spyrius.org/images/nexo-knights/wedgie-of-doom.jpg",
            "title": "066 · Wedgie of Doom",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/wedgie-of-doom.png",
            "power": [
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/cosmic-invasion.html",
            "src": "http://www.spyrius.org/images/nexo-knights/cosmic-invasion.jpg",
            "title": "067 · Cosmic Invasion",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/cosmic-invasion.png",
            "power": [
                "/nexo/img/elements/monster.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/electric-bubble.html",
            "src": "http://www.spyrius.org/images/nexo-knights/electric-bubble.jpg",
            "title": "068 · Electric Bubble",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/electric-bubble.png",
            "power": [
                "/nexo/img/elements/water.png",
                "/nexo/img/elements/bolt.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/magicians-hat.html",
            "src": "http://www.spyrius.org/images/nexo-knights/magicians-hat.jpg",
            "title": "069 · Magician's Hat",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/magicians-hat.png",
            "power": [
                "/nexo/img/elements/magic.png"
            ]
        }
    ],
    [
        {
            "href": "http://www.spyrius.org/nexo/super-human-speed.html",
            "src": "http://www.spyrius.org/images/nexo-knights/super-human-speed.jpg",
            "title": "101 · Super Human Speed",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/super-human-speed.png",
            "power": [
                "/nexo/img/elements/wind.png",
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/rolling-fireball.html",
            "src": "http://www.spyrius.org/images/nexo-knights/rolling-fireball.jpg",
            "title": "102 · Rolling Fireball",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/rolling-fireball.png",
            "power": [
                "/nexo/img/elements/fire.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/arrow-strike.html",
            "src": "http://www.spyrius.org/images/nexo-knights/arrow-strike.jpg",
            "title": "103 · Arrow Strike",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/arrow-strike.png",
            "power": [
                "/nexo/img/elements/weapon.png",
                "/nexo/img/elements/wind.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/poison-burst.html",
            "src": "http://www.spyrius.org/images/nexo-knights/poison-burst.jpg",
            "title": "104 · Poison Burst",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/poison-burst.png",
            "power": [
                "/nexo/img/elements/skull.png",
                "/nexo/img/elements/bomb.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/jungle-dragon.html",
            "src": "http://www.spyrius.org/images/nexo-knights/jungle-dragon.jpg",
            "title": "105 · Jungle Dragon",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/jungle-dragon.png",
            "power": [
                "/nexo/img/elements/dragon.png",
                "/nexo/img/elements/leaf.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/dynamighty.html",
            "src": "http://www.spyrius.org/images/nexo-knights/dynamighty.jpg",
            "title": "106 · Dynamighty",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/dynamighty.png",
            "power": [
                "/nexo/img/elements/bomb.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/venom-bite.html",
            "src": "http://www.spyrius.org/images/nexo-knights/venom-bite.jpg",
            "title": "107 · Venom Bite",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/venom-bite.png",
            "power": [
                "/nexo/img/elements/skull.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/slime-blast.html",
            "src": "http://www.spyrius.org/images/nexo-knights/slime-blast.jpg",
            "title": "108 · Slime Blast",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/slime-blast.png",
            "power": [
                "/nexo/img/elements/skull.png",
                "/nexo/img/elements/water.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/time-breach.html",
            "src": "http://www.spyrius.org/images/nexo-knights/time-breach.jpg",
            "title": "109 · Time Breach",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/time-breach.png",
            "power": [
                "/nexo/img/elements/hawk.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/swift-sting.html",
            "src": "http://www.spyrius.org/images/nexo-knights/swift-sting.jpg",
            "title": "110 · Swift Sting",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/swift-sting.png",
            "power": [
                "/nexo/img/elements/paw.png",
                "/nexo/img/elements/wind.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/bonkers-beans.html",
            "src": "http://www.spyrius.org/images/nexo-knights/bonkers-beans.jpg",
            "title": "111 · Bonkers Beans",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/bonkers-beans.png",
            "power": [
                "/nexo/img/elements/leaf.png",
                "/nexo/img/elements/fork.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/lion-of-bravery.html",
            "src": "http://www.spyrius.org/images/nexo-knights/lion-of-bravery.jpg",
            "title": "112 · Lion of Bravery",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/lion-of-bravery.png",
            "power": [
                "/nexo/img/elements/paw.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/flight-of-the-phoenix.html",
            "src": "http://www.spyrius.org/images/nexo-knights/flight-of-the-phoenix.jpg",
            "title": "113 · Flight of the Phoenix",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/flight-of-the-phoenix.png",
            "power": [
                "/nexo/img/elements/hawk.png",
                "/nexo/img/elements/fire.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/supersonic-shield.html",
            "src": "http://www.spyrius.org/images/nexo-knights/supersonic-shield.jpg",
            "title": "114 · Supersonic Shield",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/supersonic-shield.png",
            "power": [
                "/nexo/img/elements/bolt.png",
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/moth-swarm.html",
            "src": "http://www.spyrius.org/images/nexo-knights/moth-swarm.jpg",
            "title": "115 · Moth Swarm",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/moth-swarm.png",
            "power": [
                "/nexo/img/elements/bug.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/dazzling-lure.html",
            "src": "http://www.spyrius.org/images/nexo-knights/dazzling-lure.jpg",
            "title": "116 · Dazzling Lure",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/dazzling-lure.png",
            "power": [
                "/nexo/img/elements/paw.png",
                "/nexo/img/elements/sun.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/bullfrog-superbound.html",
            "src": "http://www.spyrius.org/images/nexo-knights/bullfrog-superbound.jpg",
            "title": "117 · Bullfrog Superbound",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/bullfrog-superbound.png",
            "power": [
                "/nexo/img/elements/paw.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/sour-strike.html",
            "src": "http://www.spyrius.org/images/nexo-knights/sour-strike.jpg",
            "title": "118 · Sour Strike",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/sour-strike.png",
            "power": [
                "/nexo/img/elements/skull.png",
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/broccoli-tornado.html",
            "src": "http://www.spyrius.org/images/nexo-knights/broccoli-tornado.jpg",
            "title": "119 · Broccoli Tornado",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/broccoli-tornado.png",
            "power": [
                "/nexo/img/elements/wind.png",
                "/nexo/img/elements/fork.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/mouse-trap.html",
            "src": "http://www.spyrius.org/images/nexo-knights/mouse-trap.jpg",
            "title": "120 · Mouse Trap",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/mouse-trap.png",
            "power": [
                "/nexo/img/elements/paw.png",
                "/nexo/img/elements/fork.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/adrenaline-rush.html",
            "src": "http://www.spyrius.org/images/nexo-knights/adrenaline-rush.jpg",
            "title": "121 · Adrenaline Rush",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/adrenaline-rush.png",
            "power": [
                "/nexo/img/elements/bolt.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/ice-rain.html",
            "src": "http://www.spyrius.org/images/nexo-knights/ice-rain.jpg",
            "title": "122 · Ice Rain",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/ice-rain.png",
            "power": [
                "/nexo/img/elements/snow.png",
                "/nexo/img/elements/wind.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/stone-stun.html",
            "src": "http://www.spyrius.org/images/nexo-knights/stone-stun.jpg",
            "title": "123 · Stone Stun",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/stone-stun.png",
            "power": [
                "/nexo/img/elements/armor.png",
                "/nexo/img/elements/rock.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/gaze-of-the-gorgon.html",
            "src": "http://www.spyrius.org/images/nexo-knights/gaze-of-the-gorgon.jpg",
            "title": "124 · Gaze of the Gorgon",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/gaze-of-the-gorgon.png",
            "power": [
                "/nexo/img/elements/monster.png",
                "/nexo/img/elements/skull.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/serpent-of-anti-virus.html",
            "src": "http://www.spyrius.org/images/nexo-knights/serpent-of-anti-virus.jpg",
            "title": "125 · Serpent of Anti Virus",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/serpent-of-anti-virus.png",
            "power": [
                "/nexo/img/elements/paw.png",
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/magic-anti-evil-ultra-armour-upgrade.html",
            "src": "http://www.spyrius.org/images/nexo-knights/magic-anti-evil-ultra-armour-upgrade.jpg",
            "title": "126 · Magic Anti Evil Ultra Armour Upgrade",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/magic-anti-evil-ultra-armour-upgrade.png",
            "power": [
                "/nexo/img/elements/fire.png",
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/snake-den.html",
            "src": "http://www.spyrius.org/images/nexo-knights/snake-den.jpg",
            "title": "127 · Snake Den",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/snake-den.png",
            "power": [
                "/nexo/img/elements/paw.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/funky-fungus.html",
            "src": "http://www.spyrius.org/images/nexo-knights/funky-fungus.jpg",
            "title": "128 · Funky Fungus",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/funky-fungus.png",
            "power": [
                "/nexo/img/elements/leaf.png",
                "/nexo/img/elements/note.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/transformation.html",
            "src": "http://www.spyrius.org/images/nexo-knights/transformation.jpg",
            "title": "129 · Transformation",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/transformation.png",
            "power": [
                "/nexo/img/elements/hawk.png",
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/sidekick.html",
            "src": "http://www.spyrius.org/images/nexo-knights/sidekick.jpg",
            "title": "130 · Sidekick",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/sidekick.png",
            "power": [
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/snapper-stand.html",
            "src": "http://www.spyrius.org/images/nexo-knights/snapper-stand.jpg",
            "title": "131 · Snapper Stand",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/snapper-stand.png",
            "power": [
                "/nexo/img/elements/paw.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/depth-charge.html",
            "src": "http://www.spyrius.org/images/nexo-knights/depth-charge.jpg",
            "title": "132 · Depth Charge",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/depth-charge.png",
            "power": [
                "/nexo/img/elements/rock.png",
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/bear-the-brunt.html",
            "src": "http://www.spyrius.org/images/nexo-knights/bear-the-brunt.jpg",
            "title": "134 · Bear the Brunt",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/bear-the-brunt.png",
            "power": [
                "/nexo/img/elements/paw.png",
                "/nexo/img/elements/note.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/blast-mask.html",
            "src": "http://www.spyrius.org/images/nexo-knights/blast-mask.jpg",
            "title": "135 · Blast Mask",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/blast-mask.png",
            "power": [
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/boom-stick.html",
            "src": "http://www.spyrius.org/images/nexo-knights/boom-stick.jpg",
            "title": "136 · Boom Stick",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/boom-stick.png",
            "power": [
                "/nexo/img/elements/leaf.png",
                "/nexo/img/elements/sun.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/bowmaster.html",
            "src": "http://www.spyrius.org/images/nexo-knights/bowmaster.jpg",
            "title": "137 · Bowmaster",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/bowmaster.png",
            "power": [
                "/nexo/img/elements/weapon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/candy-floss.html",
            "src": "http://www.spyrius.org/images/nexo-knights/candy-floss.jpg",
            "title": "138 · Candy Floss",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/candy-floss.png",
            "power": [
                "/nexo/img/elements/fork.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/gamma-rays.html",
            "src": "http://www.spyrius.org/images/nexo-knights/gamma-rays.jpg",
            "title": "141 · Gamma Rays",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/gamma-rays.png",
            "power": [
                "/nexo/img/elements/sun.png",
                "/nexo/img/elements/weapon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/gorilla-roar.html",
            "src": "http://www.spyrius.org/images/nexo-knights/gorilla-roar.jpg",
            "title": "142 · Gorilla Roar",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/gorilla-roar.png",
            "power": [
                "/nexo/img/elements/paw.png",
                "/nexo/img/elements/note.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/honey-bees.html",
            "src": "http://www.spyrius.org/images/nexo-knights/honey-bees.jpg",
            "title": "143 · Honey Bees",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/honey-bees.png",
            "power": [
                "/nexo/img/elements/bug.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/mechanical-griffin.html",
            "src": "http://www.spyrius.org/images/nexo-knights/mechanical-griffin.jpg",
            "title": "145 · Mechanical Griffin",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/mechanical-griffin.png",
            "power": [
                "/nexo/img/elements/monster.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/orbital-strike.html",
            "src": "http://www.spyrius.org/images/nexo-knights/orbital-strike.jpg",
            "title": "147 · Orbital Strike",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/orbital-strike.png",
            "power": [
                "/nexo/img/elements/weapon.png",
                "/nexo/img/elements/bolt.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/out-of-soap.html",
            "src": "http://www.spyrius.org/images/nexo-knights/out-of-soap.jpg",
            "title": "148 · Out of Soap",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/out-of-soap.png",
            "power": [
                "/nexo/img/elements/skull.png",
                "/nexo/img/elements/water.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/paprika-bolt.html",
            "src": "http://www.spyrius.org/images/nexo-knights/paprika-bolt.jpg",
            "title": "149 · Paprika Bolt",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/paprika-bolt.png",
            "power": [
                "/nexo/img/elements/fork.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/seagull-bomb.html",
            "src": "http://www.spyrius.org/images/nexo-knights/seagull-bomb.jpg",
            "title": "151 · Seagull Bomb",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/seagull-bomb.png",
            "power": [
                "/nexo/img/elements/bomb.png",
                "/nexo/img/elements/hawk.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/slime-slugs.html",
            "src": "http://www.spyrius.org/images/nexo-knights/slime-slugs.jpg",
            "title": "152 · Slime Slugs",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/slime-slugs.png",
            "power": [
                "/nexo/img/elements/bug.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/tone-of-power.html",
            "src": "http://www.spyrius.org/images/nexo-knights/tone-of-power.jpg",
            "title": "154 · Tone of Power",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/tone-of-power.png",
            "power": [
                "/nexo/img/elements/note.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/ravaging-rot.html",
            "src": "http://www.spyrius.org/images/nexo-knights/ravaging-rot.jpg",
            "title": "158 · Ravaging Rot",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/ravaging-rot.png",
            "power": [
                "/nexo/img/elements/leaf.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/roto-sentry.html",
            "src": "http://www.spyrius.org/images/nexo-knights/roto-sentry.jpg",
            "title": "159 · Roto Sentry",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/roto-sentry.png",
            "power": [
                "/nexo/img/elements/weapon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/devastating-decay.html",
            "src": "http://www.spyrius.org/images/nexo-knights/devastating-decay.jpg",
            "title": "160 · Devastating Decay",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/devastating-decay.png",
            "power": [
                "/nexo/img/elements/fork.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/tech-tree.html",
            "src": "http://www.spyrius.org/images/nexo-knights/tech-tree.jpg",
            "title": "161 · Tech Tree",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/tech-tree.png",
            "power": [
                "/nexo/img/elements/leaf.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/devious-demolition.html",
            "src": "http://www.spyrius.org/images/nexo-knights/devious-demolition.jpg",
            "title": "162 · Devious Demolition",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/devious-demolition.png",
            "power": [
                "/nexo/img/elements/bomb.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/living-glue.html",
            "src": "http://www.spyrius.org/images/nexo-knights/living-glue.jpg",
            "title": "164 · Living Glue",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/living-glue.png",
            "power": [
                "/nexo/img/elements/monster.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/unicorn-might.html",
            "src": "http://www.spyrius.org/images/nexo-knights/unicorn-might.jpg",
            "title": "165 · Unicorn Might",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/unicorn-might.png",
            "power": [
                "/nexo/img/elements/paw.png",
                "/nexo/img/elements/monster.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/power-of-squirrel.html",
            "src": "http://www.spyrius.org/images/nexo-knights/power-of-squirrel.jpg",
            "title": "166 · Power of Squirrel",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/power-of-squirrel.png",
            "power": [
                "/nexo/img/elements/paw.png"
            ]
        }
    ],
    [
        {
            "href": "http://www.spyrius.org/nexo/rushing-strike.html",
            "src": "http://www.spyrius.org/images/nexo-knights/rushing-strike.jpg",
            "title": "201 · Rushing Strike",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/rushing-strike.png",
            "power": [
                "/nexo/img/elements/dragon.png",
                "/nexo/img/elements/fire.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/clapperclaw.html",
            "src": "http://www.spyrius.org/images/nexo-knights/clapperclaw.jpg",
            "title": "202 · Clapperclaw",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/clapperclaw.png",
            "power": [
                "/nexo/img/elements/monster.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/mace-rain.html",
            "src": "http://www.spyrius.org/images/nexo-knights/mace-rain.jpg",
            "title": "203 · Mace Rain",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/mace-rain.png",
            "power": [
                "/nexo/img/elements/weapon.png",
                "/nexo/img/elements/wind.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/globlin-attack.html",
            "src": "http://www.spyrius.org/images/nexo-knights/globlin-attack.jpg",
            "title": "204 · Globlin Attack",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/globlin-attack.png",
            "power": [
                "/nexo/img/elements/monster.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/incinerate.html",
            "src": "http://www.spyrius.org/images/nexo-knights/incinerate.jpg",
            "title": "205 · Incinerate",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/incinerate.png",
            "power": [
                "/nexo/img/elements/fire.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/lava-dragon.html",
            "src": "http://www.spyrius.org/images/nexo-knights/lava-dragon.jpg",
            "title": "206 · Lava Dragon",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/lava-dragon.png",
            "power": [
                "/nexo/img/elements/dragon.png",
                "/nexo/img/elements/fire.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/charging-attack.html",
            "src": "http://www.spyrius.org/images/nexo-knights/charging-attack.jpg",
            "title": "207 · Charging Attack",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/charging-attack.png",
            "power": [
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/blade-of-bravery.html",
            "src": "http://www.spyrius.org/images/nexo-knights/blade-of-bravery.jpg",
            "title": "208 · Blade of Bravery",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/blade-of-bravery.png",
            "power": [
                "/nexo/img/elements/paw.png",
                "/nexo/img/elements/weapon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/soaring-eagle.html",
            "src": "http://www.spyrius.org/images/nexo-knights/soaring-eagle.jpg",
            "title": "209 · Soaring Eagle",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/soaring-eagle.png",
            "power": [
                "/nexo/img/elements/hawk.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/toxic-sting.html",
            "src": "http://www.spyrius.org/images/nexo-knights/toxic-sting.jpg",
            "title": "210 · Toxic Sting",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/toxic-sting.png",
            "power": [
                "/nexo/img/elements/bug.png",
                "/nexo/img/elements/skull.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/prism-of-clarity.html",
            "src": "http://www.spyrius.org/images/nexo-knights/prism-of-clarity.jpg",
            "title": "211 · Prism of Clarity",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/prism-of-clarity.png",
            "power": [
                "/nexo/img/elements/sun.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/magma-burst.html",
            "src": "http://www.spyrius.org/images/nexo-knights/magma-burst.jpg",
            "title": "212 · Magma Burst",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/magma-burst.png",
            "power": [
                "/nexo/img/elements/fire.png",
                "/nexo/img/elements/bomb.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/alliance-of-the-fortrex.html",
            "src": "http://www.spyrius.org/images/nexo-knights/alliance-of-the-fortrex.jpg",
            "title": "213 · Alliance of the Fortrex",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/alliance-of-the-fortrex.png",
            "power": [
                "/nexo/img/elements/armor.png",
                "/nexo/img/elements/weapon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/glory-of-knighton.html",
            "src": "http://www.spyrius.org/images/nexo-knights/glory-of-knighton.jpg",
            "title": "214 · Glory of Knighton",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/glory-of-knighton.png",
            "power": [
                "/nexo/img/elements/paw.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/cyclonic-strike.html",
            "src": "http://www.spyrius.org/images/nexo-knights/cyclonic-strike.jpg",
            "title": "215 · Cyclonic Strike",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/cyclonic-strike.png",
            "power": [
                "/nexo/img/elements/wind.png",
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/piranha-bite.html",
            "src": "http://www.spyrius.org/images/nexo-knights/piranha-bite.jpg",
            "title": "216 · Piranha Bite",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/piranha-bite.png",
            "power": [
                "/nexo/img/elements/paw.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/dark-drop.html",
            "src": "http://www.spyrius.org/images/nexo-knights/dark-drop.jpg",
            "title": "217 · Dark Drop",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/dark-drop.png",
            "power": [
                "/nexo/img/elements/paw.png",
                "/nexo/img/elements/skull.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/anvil-of-trouble.html",
            "src": "http://www.spyrius.org/images/nexo-knights/anvil-of-trouble.jpg",
            "title": "218 · Anvil of Trouble",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/anvil-of-trouble.png",
            "power": [
                "/nexo/img/elements/weapon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/hyper-kick.html",
            "src": "http://www.spyrius.org/images/nexo-knights/hyper-kick.jpg",
            "title": "219 · Hyper Kick",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/hyper-kick.png",
            "power": [
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/whiplash.html",
            "src": "http://www.spyrius.org/images/nexo-knights/whiplash.jpg",
            "title": "220 · Whiplash",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/whiplash.png",
            "power": [
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/royal-brawl.html",
            "src": "http://www.spyrius.org/images/nexo-knights/royal-brawl.jpg",
            "title": "221 · Royal Brawl",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/royal-brawl.png",
            "power": [
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/goo-geyser.html",
            "src": "http://www.spyrius.org/images/nexo-knights/goo-geyser.jpg",
            "title": "222 · Goo Geyser",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/goo-geyser.png",
            "power": [
                "/nexo/img/elements/skull.png",
                "/nexo/img/elements/rock.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/bomb-blast.html",
            "src": "http://www.spyrius.org/images/nexo-knights/bomb-blast.jpg",
            "title": "223 · Bomb Blast",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/bomb-blast.png",
            "power": [
                "/nexo/img/elements/bomb.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/rock-ripper.html",
            "src": "http://www.spyrius.org/images/nexo-knights/rock-ripper.jpg",
            "title": "224 · Rock Ripper",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/rock-ripper.png",
            "power": [
                "/nexo/img/elements/rock.png",
                "/nexo/img/elements/weapon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/majesty-of-benevolence.html",
            "src": "http://www.spyrius.org/images/nexo-knights/majesty-of-benevolence.jpg",
            "title": "225 · Majesty of Benevolence",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/majesty-of-benevolence.png",
            "power": [
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/chimera-of-courtesy.html",
            "src": "http://www.spyrius.org/images/nexo-knights/chimera-of-courtesy.jpg",
            "title": "226 · Chimera of Courtesy",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/chimera-of-courtesy.png",
            "power": [
                "/nexo/img/elements/monster.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/bubble-gum-misfire.html",
            "src": "http://www.spyrius.org/images/nexo-knights/bubble-gum-misfire.jpg",
            "title": "227 · Bubble Gum Misfire",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/bubble-gum-misfire.png",
            "power": [
                "/nexo/img/elements/armor.png",
                "/nexo/img/elements/fork.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/force-of-nature.html",
            "src": "http://www.spyrius.org/images/nexo-knights/force-of-nature.jpg",
            "title": "228 · Force of Nature",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/force-of-nature.png",
            "power": [
                "/nexo/img/elements/leaf.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/manowar.html",
            "src": "http://www.spyrius.org/images/nexo-knights/manowar.jpg",
            "title": "229 · Manowar",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/manowar.png",
            "power": [
                "/nexo/img/elements/paw.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/saber-slash.html",
            "src": "http://www.spyrius.org/images/nexo-knights/saber-slash.jpg",
            "title": "230 · Saber Slash",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/saber-slash.png",
            "power": [
                "/nexo/img/elements/weapon.png",
                "/nexo/img/elements/wind.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/stone-spike.html",
            "src": "http://www.spyrius.org/images/nexo-knights/stone-spike.jpg",
            "title": "231 · Stone Spike",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/stone-spike.png",
            "power": [
                "/nexo/img/elements/rock.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/skunk-stench.html",
            "src": "http://www.spyrius.org/images/nexo-knights/skunk-stench.jpg",
            "title": "232 · Skunk Stench",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/skunk-stench.png",
            "power": [
                "/nexo/img/elements/paw.png",
                "/nexo/img/elements/skull.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/sparrow-tornado.html",
            "src": "http://www.spyrius.org/images/nexo-knights/sparrow-tornado.jpg",
            "title": "233 · Sparrow Tornado",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/sparrow-tornado.png",
            "power": [
                "/nexo/img/elements/wind.png",
                "/nexo/img/elements/hawk.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/quicksand.html",
            "src": "http://www.spyrius.org/images/nexo-knights/quicksand.jpg",
            "title": "234 · Quicksand",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/quicksand.png",
            "power": [
                "/nexo/img/elements/rock.png",
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/black-lobster-claws.html",
            "src": "http://www.spyrius.org/images/nexo-knights/black-lobster-claws.jpg",
            "title": "236 · Black Lobster Claws",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/black-lobster-claws.png",
            "power": [
                "/nexo/img/elements/paw.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/triple-backstab.html",
            "src": "http://www.spyrius.org/images/nexo-knights/triple-backstab.jpg",
            "title": "237 · Triple Backstab",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/triple-backstab.png",
            "power": [
                "/nexo/img/elements/weapon.png",
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/bull-race.html",
            "src": "http://www.spyrius.org/images/nexo-knights/bull-race.jpg",
            "title": "238 · Bull Race",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/bull-race.png",
            "power": [
                "/nexo/img/elements/paw.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/burnt-hot-dog.html",
            "src": "http://www.spyrius.org/images/nexo-knights/burnt-hot-dog.jpg",
            "title": "239 · Burnt Hot Dog",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/burnt-hot-dog.png",
            "power": [
                "/nexo/img/elements/fork.png",
                "/nexo/img/elements/fire.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/commanding-shout.html",
            "src": "http://www.spyrius.org/images/nexo-knights/commanding-shout.jpg",
            "title": "240 · Commanding Shout",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/commanding-shout.png",
            "power": [
                "/nexo/img/elements/armor.png",
                "/nexo/img/elements/note.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/crimson-bat.html",
            "src": "http://www.spyrius.org/images/nexo-knights/crimson-bat.jpg",
            "title": "241 · Crimson Bat",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/crimson-bat.png",
            "power": [
                "/nexo/img/elements/paw.png",
                "/nexo/img/elements/wind.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/lord-helmet.html",
            "src": "http://www.spyrius.org/images/nexo-knights/lord-helmet.jpg",
            "title": "242 · Lord Helmet",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/lord-helmet.png",
            "power": [
                "/nexo/img/elements/armor.png",
                "/nexo/img/elements/bolt.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/lucky-break.html",
            "src": "http://www.spyrius.org/images/nexo-knights/lucky-break.jpg",
            "title": "243 · Lucky Break",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/lucky-break.png",
            "power": [
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/manic-pumpkin.html",
            "src": "http://www.spyrius.org/images/nexo-knights/manic-pumpkin.jpg",
            "title": "244 · Manic Pumpkin",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/manic-pumpkin.png",
            "power": [
                "/nexo/img/elements/fork.png",
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/mirror-me.html",
            "src": "http://www.spyrius.org/images/nexo-knights/mirror-me.jpg",
            "title": "245 · Mirror Me",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/mirror-me.png",
            "power": [
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/ninja-strike.html",
            "src": "http://www.spyrius.org/images/nexo-knights/ninja-strike.jpg",
            "title": "247 · Ninja Strike",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/ninja-strike.png",
            "power": [
                "/nexo/img/elements/weapon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/power-glue.html",
            "src": "http://www.spyrius.org/images/nexo-knights/power-glue.jpg",
            "title": "248 · Power Glue",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/power-glue.png",
            "power": [
                "/nexo/img/elements/water.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/prune-juice.html",
            "src": "http://www.spyrius.org/images/nexo-knights/prune-juice.jpg",
            "title": "249 · Prune Juice",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/prune-juice.png",
            "power": [
                "/nexo/img/elements/fork.png",
                "/nexo/img/elements/skull.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/silver-pegasus.html",
            "src": "http://www.spyrius.org/images/nexo-knights/silver-pegasus.jpg",
            "title": "250 · Silver Pegasus",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/silver-pegasus.png",
            "power": [
                "/nexo/img/elements/monster.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/speed-elixir.html",
            "src": "http://www.spyrius.org/images/nexo-knights/speed-elixir.jpg",
            "title": "252 · Speed Elixir",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/speed-elixir.png",
            "power": [
                "/nexo/img/elements/fire.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/swiss-cheese.html",
            "src": "http://www.spyrius.org/images/nexo-knights/swiss-cheese.jpg",
            "title": "253 · Swiss Cheese",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/swiss-cheese.png",
            "power": [
                "/nexo/img/elements/fork.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/turbo-kitty.html",
            "src": "http://www.spyrius.org/images/nexo-knights/turbo-kitty.jpg",
            "title": "255 · Turbo Kitty",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/turbo-kitty.png",
            "power": [
                "/nexo/img/elements/paw.png",
                "/nexo/img/elements/bolt.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/wrecking-ball.html",
            "src": "http://www.spyrius.org/images/nexo-knights/wrecking-ball.jpg",
            "title": "256 · Wrecking Ball",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/wrecking-ball.png",
            "power": [
                "/nexo/img/elements/weapon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/relentless-rust.html",
            "src": "http://www.spyrius.org/images/nexo-knights/relentless-rust.jpg",
            "title": "258 · Relentless Rust",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/relentless-rust.png",
            "power": [
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/wrecking-wrath.html",
            "src": "http://www.spyrius.org/images/nexo-knights/wrecking-wrath.jpg",
            "title": "259 · Wrecking Wrath",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/wrecking-wrath.png",
            "power": [
                "/nexo/img/elements/monster.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/court-jester.html",
            "src": "http://www.spyrius.org/images/nexo-knights/court-jester.jpg",
            "title": "260 · Court Jester",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/court-jester.png",
            "power": [
                "/nexo/img/elements/magic.png",
                "/nexo/img/elements/bomb.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/rock-and-rumble.html",
            "src": "http://www.spyrius.org/images/nexo-knights/rock-and-rumble.jpg",
            "title": "263 · Rock n'Rumble",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/rock-and-rumble.png",
            "power": [
                "/nexo/img/elements/rock.png",
                "/nexo/img/elements/bomb.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/special-delivery.html",
            "src": "http://www.spyrius.org/images/nexo-knights/special-delivery.jpg",
            "title": "264 · Special Delivery",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/special-delivery.png",
            "power": [
                "/nexo/img/elements/wind.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/love-power.html",
            "src": "http://www.spyrius.org/images/nexo-knights/love-power.jpg",
            "title": "266 · Love Power",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/love-power.png",
            "power": [
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/wisdom-key.html",
            "src": "http://www.spyrius.org/images/nexo-knights/wisdom-key.jpg",
            "title": "267 · Wisdom Key",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/wisdom-key.png",
            "power": [
                "/nexo/img/elements/magic.png"
            ]
        }
    ],
    [
        {
            "href": "http://www.spyrius.org/nexo/tractor-beam.html",
            "src": "http://www.spyrius.org/images/nexo-knights/tractor-beam.jpg",
            "title": "301 · Tractor Beam",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/tractor-beam.png",
            "power": [
                "/nexo/img/elements/weapon.png",
                "/nexo/img/elements/wind.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/cloning.html",
            "src": "http://www.spyrius.org/images/nexo-knights/cloning.jpg",
            "title": "302 · Cloning",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/cloning.png",
            "power": [
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/chicken-power.html",
            "src": "http://www.spyrius.org/images/nexo-knights/chicken-power.jpg",
            "title": "303 · Chicken Power",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/chicken-power.png",
            "power": [
                "/nexo/img/elements/hawk.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/spirit-vortex.html",
            "src": "http://www.spyrius.org/images/nexo-knights/spirit-vortex.jpg",
            "title": "304 · Spirit Vortex",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/spirit-vortex.png",
            "power": [
                "/nexo/img/elements/wind.png",
                "/nexo/img/elements/monster.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/beetle-bomb.html",
            "src": "http://www.spyrius.org/images/nexo-knights/beetle-bomb.jpg",
            "title": "305 · Beetle Bomb",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/beetle-bomb.png",
            "power": [
                "/nexo/img/elements/bug.png",
                "/nexo/img/elements/bomb.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/force-field.html",
            "src": "http://www.spyrius.org/images/nexo-knights/force-field.jpg",
            "title": "306 · Force Field",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/force-field.png",
            "power": [
                "/nexo/img/elements/armor.png",
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/take-off.html",
            "src": "http://www.spyrius.org/images/nexo-knights/take-off.jpg",
            "title": "307 · Take Off",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/take-off.png",
            "power": [
                "/nexo/img/elements/hawk.png",
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/ice-dragon.html",
            "src": "http://www.spyrius.org/images/nexo-knights/ice-dragon.jpg",
            "title": "308 · Ice Dragon",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/ice-dragon.png",
            "power": [
                "/nexo/img/elements/dragon.png",
                "/nexo/img/elements/snow.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/dazzling-hero.html",
            "src": "http://www.spyrius.org/images/nexo-knights/dazzling-hero.jpg",
            "title": "309 · Dazzling Hero",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/dazzling-hero.png",
            "power": [
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/boomerang.html",
            "src": "http://www.spyrius.org/images/nexo-knights/boomerang.jpg",
            "title": "310 · Boomerang",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/boomerang.png",
            "power": [
                "/nexo/img/elements/weapon.png",
                "/nexo/img/elements/wind.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/thunder-blaze.html",
            "src": "http://www.spyrius.org/images/nexo-knights/thunder-blaze.jpg",
            "title": "311 · Thunder Blaze",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/thunder-blaze.png",
            "power": [
                "/nexo/img/elements/bolt.png",
                "/nexo/img/elements/paw.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/wild-boar.html",
            "src": "http://www.spyrius.org/images/nexo-knights/wild-boar.jpg",
            "title": "312 · Wild Boar",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/wild-boar.png",
            "power": [
                "/nexo/img/elements/paw.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/light-burst.html",
            "src": "http://www.spyrius.org/images/nexo-knights/light-burst.jpg",
            "title": "313 · Light Burst",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/light-burst.png",
            "power": [
                "/nexo/img/elements/bomb.png",
                "/nexo/img/elements/sun.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/avenging-ultra-armor.html",
            "src": "http://www.spyrius.org/images/nexo-knights/avenging-ultra-armor.jpg",
            "title": "314 · Avenging Ultra Armor",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/avenging-ultra-armor.png",
            "power": [
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/sword-of-strength-and-supremacy.html",
            "src": "http://www.spyrius.org/images/nexo-knights/sword-of-strength-and-supremacy.jpg",
            "title": "315 · Sword of Strength and Supremacy",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/sword-of-strength-and-supremacy.png",
            "power": [
                "/nexo/img/elements/weapon.png",
                "/nexo/img/elements/rock.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/mighty-pen.html",
            "src": "http://www.spyrius.org/images/nexo-knights/mighty-pen.jpg",
            "title": "316 · Mighty Pen",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/mighty-pen.png",
            "power": [
                "/nexo/img/elements/hawk.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/greatest-hits.html",
            "src": "http://www.spyrius.org/images/nexo-knights/greatest-hits.jpg",
            "title": "317 · Greatest Hits",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/greatest-hits.png",
            "power": [
                "/nexo/img/elements/note.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/disco-frenzy.html",
            "src": "http://www.spyrius.org/images/nexo-knights/disco-frenzy.jpg",
            "title": "318 · Disco Frenzy",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/disco-frenzy.png",
            "power": [
                "/nexo/img/elements/sun.png",
                "/nexo/img/elements/bomb.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/silver-whip.html",
            "src": "http://www.spyrius.org/images/nexo-knights/silver-whip.jpg",
            "title": "319 · Silver Whip",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/silver-whip.png",
            "power": [
                "/nexo/img/elements/weapon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/champion-of-chivalry.html",
            "src": "http://www.spyrius.org/images/nexo-knights/champion-of-chivalry.jpg",
            "title": "320 · Champion of Chivalry",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/champion-of-chivalry.png",
            "power": [
                "/nexo/img/elements/weapon.png",
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/pinball-magician.html",
            "src": "http://www.spyrius.org/images/nexo-knights/pinball-magician.jpg",
            "title": "321 · Pinball Magician",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/pinball-magician.png",
            "power": [
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/flash-cannon.html",
            "src": "http://www.spyrius.org/images/nexo-knights/flash-cannon.jpg",
            "title": "322 · Flash Cannon",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/flash-cannon.png",
            "power": [
                "/nexo/img/elements/weapon.png",
                "/nexo/img/elements/sun.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/magnetize.html",
            "src": "http://www.spyrius.org/images/nexo-knights/magnetize.jpg",
            "title": "323 · Magnetize",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/magnetize.png",
            "power": [
                "/nexo/img/elements/wind.png",
                "/nexo/img/elements/rock.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/draining-scarf.html",
            "src": "http://www.spyrius.org/images/nexo-knights/draining-scarf.jpg",
            "title": "324 · Draining Scarf",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/draining-scarf.png",
            "power": [
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/max-power.html",
            "src": "http://www.spyrius.org/images/nexo-knights/max-power.jpg",
            "title": "325 · Max Power",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/max-power.png",
            "power": [
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/griffon-of-graciousness.html",
            "src": "http://www.spyrius.org/images/nexo-knights/griffon-of-graciousness.jpg",
            "title": "326 · Griffon of Graciousness",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/griffon-of-graciousness.png",
            "power": [
                "/nexo/img/elements/monster.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/daring-deliverance.html",
            "src": "http://www.spyrius.org/images/nexo-knights/daring-deliverance.jpg",
            "title": "327 · Daring Deliverance",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/daring-deliverance.png",
            "power": [
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/starfall.html",
            "src": "http://www.spyrius.org/images/nexo-knights/starfall.jpg",
            "title": "328 · Starfall",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/starfall.png",
            "power": [
                "/nexo/img/elements/fire.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/rat-tide.html",
            "src": "http://www.spyrius.org/images/nexo-knights/rat-tide.jpg",
            "title": "329 · Rat Tide",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/rat-tide.png",
            "power": [
                "/nexo/img/elements/paw.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/golden-touch.html",
            "src": "http://www.spyrius.org/images/nexo-knights/golden-touch.jpg",
            "title": "330 · Golden Touch",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/golden-touch.png",
            "power": [
                "/nexo/img/elements/fork.png",
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/silk-spider.html",
            "src": "http://www.spyrius.org/images/nexo-knights/silk-spider.jpg",
            "title": "331 · Silk Spider",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/silk-spider.png",
            "power": [
                "/nexo/img/elements/bug.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/sand-tornado.html",
            "src": "http://www.spyrius.org/images/nexo-knights/sand-tornado.jpg",
            "title": "332 · Sand Tornado",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/sand-tornado.png",
            "power": [
                "/nexo/img/elements/wind.png",
                "/nexo/img/elements/rock.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/spin-drifter.html",
            "src": "http://www.spyrius.org/images/nexo-knights/spin-drifter.jpg",
            "title": "333 · Spin Drifter",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/spin-drifter.png",
            "power": [
                "/nexo/img/elements/wind.png",
                "/nexo/img/elements/water.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/globe-of-light.html",
            "src": "http://www.spyrius.org/images/nexo-knights/globe-of-light.jpg",
            "title": "334 · Globe Of Light",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/globe-of-light.png",
            "power": [
                "/nexo/img/elements/sun.png",
                "/nexo/img/elements/rock.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/quake-ball.html",
            "src": "http://www.spyrius.org/images/nexo-knights/quake-ball.jpg",
            "title": "335 · Quake Ball",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/quake-ball.png",
            "power": [
                "/nexo/img/elements/rock.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/power-of-united-knights.html",
            "src": "http://www.spyrius.org/images/nexo-knights/power-of-united-knights.jpg",
            "title": "336 · Power of United Knights",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/power-of-united-knights.png",
            "power": [
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/algebra-gamble.html",
            "src": "http://www.spyrius.org/images/nexo-knights/algebra-gamble.jpg",
            "title": "337 · Algebra Gamble",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/algebra-gamble.png",
            "power": [
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/arctic-breath.html",
            "src": "http://www.spyrius.org/images/nexo-knights/arctic-breath.jpg",
            "title": "338 · Arctic Breath",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/arctic-breath.png",
            "power": [
                "/nexo/img/elements/snow.png",
                "/nexo/img/elements/wind.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/bad-reputation.html",
            "src": "http://www.spyrius.org/images/nexo-knights/bad-reputation.jpg",
            "title": "339 · Bad Reputation",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/bad-reputation.png",
            "power": [
                "/nexo/img/elements/magic.png",
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/battle-cry.html",
            "src": "http://www.spyrius.org/images/nexo-knights/battle-cry.jpg",
            "title": "340 · Battle Cry",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/battle-cry.png",
            "power": [
                "/nexo/img/elements/note.png",
                "/nexo/img/elements/weapon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/bearded-ballerina.html",
            "src": "http://www.spyrius.org/images/nexo-knights/bearded-ballerina.jpg",
            "title": "341 · Bearded Ballerina",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/bearded-ballerina.png",
            "power": [
                "/nexo/img/elements/weapon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/bowling-cyclone.html",
            "src": "http://www.spyrius.org/images/nexo-knights/bowling-cyclone.jpg",
            "title": "343 · Bowling Cyclone",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/bowling-cyclone.png",
            "power": [
                "/nexo/img/elements/wind.png",
                "/nexo/img/elements/weapon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/broken-heart.html",
            "src": "http://www.spyrius.org/images/nexo-knights/broken-heart.jpg",
            "title": "344 · Broken Heart",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/broken-heart.png",
            "power": [
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/carrot-missile.html",
            "src": "http://www.spyrius.org/images/nexo-knights/carrot-missile.jpg",
            "title": "345 · Carrot Missile",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/carrot-missile.png",
            "power": [
                "/nexo/img/elements/fork.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/centaur-charge.html",
            "src": "http://www.spyrius.org/images/nexo-knights/centaur-charge.jpg",
            "title": "346 · Centaur Charge",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/centaur-charge.png",
            "power": [
                "/nexo/img/elements/monster.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/cobra-backstab.html",
            "src": "http://www.spyrius.org/images/nexo-knights/cobra-backstab.jpg",
            "title": "347 · Cobra Backstab",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/cobra-backstab.png",
            "power": [
                "/nexo/img/elements/paw.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/diamond-spear.html",
            "src": "http://www.spyrius.org/images/nexo-knights/diamond-spear.jpg",
            "title": "348 · Diamond Spear",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/diamond-spear.png",
            "power": [
                "/nexo/img/elements/weapon.png",
                "/nexo/img/elements/wind.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/goose-bumps.html",
            "src": "http://www.spyrius.org/images/nexo-knights/goose-bumps.jpg",
            "title": "349 · Goose Bumps",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/goose-bumps.png",
            "power": [
                "/nexo/img/elements/hawk.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/loadmaster.html",
            "src": "http://www.spyrius.org/images/nexo-knights/loadmaster.jpg",
            "title": "352 · Loadmaster",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/loadmaster.png",
            "power": [
                "/nexo/img/elements/wind.png",
                "/nexo/img/elements/rock.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/mammoth.html",
            "src": "http://www.spyrius.org/images/nexo-knights/mammoth.jpg",
            "title": "353 · Mammoth",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/mammoth.png",
            "power": [
                "/nexo/img/elements/paw.png",
                "/nexo/img/elements/monster.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/mantis-embrace.html",
            "src": "http://www.spyrius.org/images/nexo-knights/mantis-embrace.jpg",
            "title": "354 · Mantis Embrace",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/mantis-embrace.png",
            "power": [
                "/nexo/img/elements/bug.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/metal-minotaur.html",
            "src": "http://www.spyrius.org/images/nexo-knights/metal-minotaur.jpg",
            "title": "355 · Metal Minotaur",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/metal-minotaur.png",
            "power": [
                "/nexo/img/elements/paw.png",
                "/nexo/img/elements/monster.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/mindbender.html",
            "src": "http://www.spyrius.org/images/nexo-knights/mindbender.jpg",
            "title": "356 · Mindbender",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/mindbender.png",
            "power": [
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/porcupine-hug.html",
            "src": "http://www.spyrius.org/images/nexo-knights/porcupine-hug.jpg",
            "title": "358 · Porcupine Hug",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/porcupine-hug.png",
            "power": [
                "/nexo/img/elements/paw.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/rolling-hedgehog.html",
            "src": "http://www.spyrius.org/images/nexo-knights/rolling-hedgehog.jpg",
            "title": "360 · Rolling Hedgehog",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/rolling-hedgehog.png",
            "power": [
                "/nexo/img/elements/paw.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/stunning-showmanship.html",
            "src": "http://www.spyrius.org/images/nexo-knights/stunning-showmanship.jpg",
            "title": "362 · Stunning Showmanship",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/stunning-showmanship.png",
            "power": [
                "/nexo/img/elements/weapon.png",
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/shocking-scare.html",
            "src": "http://www.spyrius.org/images/nexo-knights/shocking-scare.jpg",
            "title": "365 · Shocking Scare",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/shocking-scare.png",
            "power": [
                "/nexo/img/elements/hawk.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/dreadful-disintegration.html",
            "src": "http://www.spyrius.org/images/nexo-knights/dreadful-disintegration.jpg",
            "title": "366 · Dreadful Disintegration",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/dreadful-disintegration.png",
            "power": [
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/horrible-hunger.html",
            "src": "http://www.spyrius.org/images/nexo-knights/horrible-hunger.jpg",
            "title": "368 · Horrible Hunger",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/horrible-hunger.png",
            "power": [
                "/nexo/img/elements/paw.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/triple-trouble.html",
            "src": "http://www.spyrius.org/images/nexo-knights/triple-trouble.jpg",
            "title": "369 · Triple Trouble",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/triple-trouble.png",
            "power": [
                "/nexo/img/elements/weapon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/agent-of-awesome.html",
            "src": "http://www.spyrius.org/images/nexo-knights/agent-of-awesome.jpg",
            "title": "370 · Agent of Awesome",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/agent-of-awesome.png",
            "power": [
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/screaming-shatter.html",
            "src": "http://www.spyrius.org/images/nexo-knights/screaming-shatter.jpg",
            "title": "371 · Screaming Shatter",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/screaming-shatter.png",
            "power": [
                "/nexo/img/elements/note.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/henchmans-help.html",
            "src": "http://www.spyrius.org/images/nexo-knights/henchmans-help.jpg",
            "title": "373 · Henchman's Help",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/henchmans-help.png",
            "power": [
                "/nexo/img/elements/monster.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/protective-fortress.html",
            "src": "http://www.spyrius.org/images/nexo-knights/protective-fortress.jpg",
            "title": "374 · Protective Fortress",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/protective-fortress.png",
            "power": []
        }
    ],
    [
        {
            "href": "http://www.spyrius.org/nexo/ground-pound.html",
            "src": "http://www.spyrius.org/images/nexo-knights/ground-pound.jpg",
            "title": "401 · Ground Pound",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/ground-pound.png",
            "power": [
                "/nexo/img/elements/rock.png",
                "/nexo/img/elements/weapon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/nexo-blade.html",
            "src": "http://www.spyrius.org/images/nexo-knights/nexo-blade.jpg",
            "title": "402 · NEXO Blade",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/nexo-blade.png",
            "power": [
                "/nexo/img/elements/weapon.png",
                "/nexo/img/elements/sun.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/target-blaster.html",
            "src": "http://www.spyrius.org/images/nexo-knights/target-blaster.jpg",
            "title": "403 · Target Blaster",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/target-blaster.png",
            "power": [
                "/nexo/img/elements/bomb.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/phoenix-blaze.html",
            "src": "http://www.spyrius.org/images/nexo-knights/phoenix-blaze.jpg",
            "title": "404 · Phoenix Blaze",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/phoenix-blaze.png",
            "power": [
                "/nexo/img/elements/weapon.png",
                "/nexo/img/elements/fire.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/storm-dragon.html",
            "src": "http://www.spyrius.org/images/nexo-knights/storm-dragon.jpg",
            "title": "405 · Storm Dragon",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/storm-dragon.png",
            "power": [
                "/nexo/img/elements/dragon.png",
                "/nexo/img/elements/bolt.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/mightiness.html",
            "src": "http://www.spyrius.org/images/nexo-knights/mightiness.jpg",
            "title": "406 · Mightiness",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/mightiness.png",
            "power": [
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/flame-wreck.html",
            "src": "http://www.spyrius.org/images/nexo-knights/flame-wreck.jpg",
            "title": "407 · Flame Wreck",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/flame-wreck.png",
            "power": [
                "/nexo/img/elements/weapon.png",
                "/nexo/img/elements/fire.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/hammer-slam.html",
            "src": "http://www.spyrius.org/images/nexo-knights/hammer-slam.jpg",
            "title": "408 · Hammer Slam",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/hammer-slam.png",
            "power": [
                "/nexo/img/elements/weapon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/giggling-ultra-armor.html",
            "src": "http://www.spyrius.org/images/nexo-knights/giggling-ultra-armor.jpg",
            "title": "409 · Giggling Ultra Armor",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/giggling-ultra-armor.png",
            "power": [
                "/nexo/img/elements/hawk.png",
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/raging-rally.html",
            "src": "http://www.spyrius.org/images/nexo-knights/raging-rally.jpg",
            "title": "410 · Raging Rally",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/raging-rally.png",
            "power": [
                "/nexo/img/elements/paw.png",
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/stone-burst.html",
            "src": "http://www.spyrius.org/images/nexo-knights/stone-burst.jpg",
            "title": "411 · Stone Burst",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/stone-burst.png",
            "power": [
                "/nexo/img/elements/bomb.png",
                "/nexo/img/elements/rock.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/power-plant.html",
            "src": "http://www.spyrius.org/images/nexo-knights/power-plant.jpg",
            "title": "412 · Power Plant",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/power-plant.png",
            "power": [
                "/nexo/img/elements/leaf.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/under-woe.html",
            "src": "http://www.spyrius.org/images/nexo-knights/under-woe.jpg",
            "title": "413 · Under Woe",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/under-woe.png",
            "power": [
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/downsizer.html",
            "src": "http://www.spyrius.org/images/nexo-knights/downsizer.jpg",
            "title": "414 · Downsizer",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/downsizer.png",
            "power": [
                "/nexo/img/elements/armor.png",
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/gauntlet-of-truth.html",
            "src": "http://www.spyrius.org/images/nexo-knights/gauntlet-of-truth.jpg",
            "title": "415 · Gauntlet of Truth",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/gauntlet-of-truth.png",
            "power": [
                "/nexo/img/elements/armor.png",
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/ultra-armor-awesome-sauce.html",
            "src": "http://www.spyrius.org/images/nexo-knights/ultra-armor-awesome-sauce.jpg",
            "title": "416 · Ultra Armor Awesome Sauce",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/ultra-armor-awesome-sauce.png",
            "power": [
                "/nexo/img/elements/bolt.png",
                "/nexo/img/elements/water.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/end-of-time.html",
            "src": "http://www.spyrius.org/images/nexo-knights/end-of-time.jpg",
            "title": "417 · End of Time",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/end-of-time.png",
            "power": [
                "/nexo/img/elements/rock.png",
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/clover-of-misfortune.html",
            "src": "http://www.spyrius.org/images/nexo-knights/clover-of-misfortune.jpg",
            "title": "418 · Clover of Misfortune",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/clover-of-misfortune.png",
            "power": [
                "/nexo/img/elements/leaf.png",
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/bad-boils.html",
            "src": "http://www.spyrius.org/images/nexo-knights/bad-boils.jpg",
            "title": "419 · Bad Boils",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/bad-boils.png",
            "power": [
                "/nexo/img/elements/skull.png",
                "/nexo/img/elements/bomb.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/atomic-acorn.html",
            "src": "http://www.spyrius.org/images/nexo-knights/atomic-acorn.jpg",
            "title": "420 · Atomic Acorn",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/atomic-acorn.png",
            "power": [
                "/nexo/img/elements/fork.png",
                "/nexo/img/elements/bomb.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/shark-attack.html",
            "src": "http://www.spyrius.org/images/nexo-knights/shark-attack.jpg",
            "title": "421 · Shark Attack",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/shark-attack.png",
            "power": [
                "/nexo/img/elements/paw.png",
                "/nexo/img/elements/water.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/fire-tornado.html",
            "src": "http://www.spyrius.org/images/nexo-knights/fire-tornado.jpg",
            "title": "422 · Fire Tornado",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/fire-tornado.png",
            "power": [
                "/nexo/img/elements/wind.png",
                "/nexo/img/elements/fire.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/wall-block.html",
            "src": "http://www.spyrius.org/images/nexo-knights/wall-block.jpg",
            "title": "423 · Wall Block",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/wall-block.png",
            "power": [
                "/nexo/img/elements/rock.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/rock-throw.html",
            "src": "http://www.spyrius.org/images/nexo-knights/rock-throw.jpg",
            "title": "424 · Rock Throw",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/rock-throw.png",
            "power": [
                "/nexo/img/elements/weapon.png",
                "/nexo/img/elements/rock.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/fist-smash.html",
            "src": "http://www.spyrius.org/images/nexo-knights/fist-smash.jpg",
            "title": "425 · Fist Smash",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/fist-smash.png",
            "power": [
                "/nexo/img/elements/armor.png",
                "/nexo/img/elements/rock.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/foul-steam.html",
            "src": "http://www.spyrius.org/images/nexo-knights/foul-steam.jpg",
            "title": "426 · Foul Steam",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/foul-steam.png",
            "power": [
                "/nexo/img/elements/fork.png",
                "/nexo/img/elements/skull.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/monsoon-storm.html",
            "src": "http://www.spyrius.org/images/nexo-knights/monsoon-storm.jpg",
            "title": "427 · Monsoon Storm",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/monsoon-storm.png",
            "power": [
                "/nexo/img/elements/wind.png",
                "/nexo/img/elements/water.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/stampede.html",
            "src": "http://www.spyrius.org/images/nexo-knights/stampede.jpg",
            "title": "428 · Stampede",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/stampede.png",
            "power": [
                "/nexo/img/elements/paw.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/might-of-the-magician.html",
            "src": "http://www.spyrius.org/images/nexo-knights/might-of-the-magician.jpg",
            "title": "429 · Might of the Magician",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/might-of-the-magician.png",
            "power": [
                "/nexo/img/elements/magic.png",
                "/nexo/img/elements/weapon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/remote-control.html",
            "src": "http://www.spyrius.org/images/nexo-knights/remote-control.jpg",
            "title": "430 · Remote Control",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/remote-control.png",
            "power": [
                "/nexo/img/elements/bolt.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/superhero-bodyslam.html",
            "src": "http://www.spyrius.org/images/nexo-knights/superhero-bodyslam.jpg",
            "title": "431 · Superhero Bodyslam",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/superhero-bodyslam.png",
            "power": [
                "/nexo/img/elements/magic.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/potent-peppery-power-axe.html",
            "src": "http://www.spyrius.org/images/nexo-knights/potent-peppery-power-axe.jpg",
            "title": "432 · Potent Peppery Power Axe",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/potent-peppery-power-axe.png",
            "power": [
                "/nexo/img/elements/fork.png",
                "/nexo/img/elements/fire.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/wasp-missile.html",
            "src": "http://www.spyrius.org/images/nexo-knights/wasp-missile.jpg",
            "title": "433 · Wasp Missile",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/wasp-missile.png",
            "power": [
                "/nexo/img/elements/bug.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/iron-hair.html",
            "src": "http://www.spyrius.org/images/nexo-knights/iron-hair.jpg",
            "title": "434 · Iron Hair",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/iron-hair.png",
            "power": [
                "/nexo/img/elements/magic.png",
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/ripping-thorns.html",
            "src": "http://www.spyrius.org/images/nexo-knights/ripping-thorns.jpg",
            "title": "435 · Ripping Thorns",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/ripping-thorns.png",
            "power": [
                "/nexo/img/elements/leaf.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/rock-n-roll.html",
            "src": "http://www.spyrius.org/images/nexo-knights/rock-n-roll.jpg",
            "title": "436 · Rock 'n' Roll",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/rock-n-roll.png",
            "power": [
                "/nexo/img/elements/note.png",
                "/nexo/img/elements/weapon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/big-turkey.html",
            "src": "http://www.spyrius.org/images/nexo-knights/big-turkey.jpg",
            "title": "437 · Big Turkey",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/big-turkey.png",
            "power": [
                "/nexo/img/elements/fork.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/bracer-of-strength.html",
            "src": "http://www.spyrius.org/images/nexo-knights/bracer-of-strength.jpg",
            "title": "438 · Bracer of Strength",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/bracer-of-strength.png",
            "power": [
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/bulldozer.html",
            "src": "http://www.spyrius.org/images/nexo-knights/bulldozer.jpg",
            "title": "439 · Bulldozer",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/bulldozer.png",
            "power": [
                "/nexo/img/elements/armor.png",
                "/nexo/img/elements/weapon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/chili-con-carne.html",
            "src": "http://www.spyrius.org/images/nexo-knights/chili-con-carne.jpg",
            "title": "441 · Chili Con Carne",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/chili-con-carne.png",
            "power": [
                "/nexo/img/elements/fork.png",
                "/nexo/img/elements/fire.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/earthquake.html",
            "src": "http://www.spyrius.org/images/nexo-knights/earthquake.jpg",
            "title": "442 · Earthquake",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/earthquake.png",
            "power": [
                "/nexo/img/elements/rock.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/grasshopper.html",
            "src": "http://www.spyrius.org/images/nexo-knights/grasshopper.jpg",
            "title": "443 · Grasshopper",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/grasshopper.png",
            "power": [
                "/nexo/img/elements/bug.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/hydras-blast.html",
            "src": "http://www.spyrius.org/images/nexo-knights/hydras-blast.jpg",
            "title": "444 · Hydra's Blast",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/hydras-blast.png",
            "power": [
                "/nexo/img/elements/dragon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/long-gong.html",
            "src": "http://www.spyrius.org/images/nexo-knights/long-gong.jpg",
            "title": "445 · Long Gong",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/long-gong.png",
            "power": [
                "/nexo/img/elements/note.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/pie-guard.html",
            "src": "http://www.spyrius.org/images/nexo-knights/pie-guard.jpg",
            "title": "447 · Pie Guard",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/pie-guard.png",
            "power": [
                "/nexo/img/elements/fork.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/rock-twister.html",
            "src": "http://www.spyrius.org/images/nexo-knights/rock-twister.jpg",
            "title": "448 · Rock Twister",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/rock-twister.png",
            "power": [
                "/nexo/img/elements/wind.png",
                "/nexo/img/elements/rock.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/shining-axe.html",
            "src": "http://www.spyrius.org/images/nexo-knights/shining-axe.jpg",
            "title": "450 · Shining Axe",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/shining-axe.png",
            "power": [
                "/nexo/img/elements/weapon.png",
                "/nexo/img/elements/rock.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/spirit-fox.html",
            "src": "http://www.spyrius.org/images/nexo-knights/spirit-fox.jpg",
            "title": "452 · Spirit Fox",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/spirit-fox.png",
            "power": [
                "/nexo/img/elements/paw.png",
                "/nexo/img/elements/wind.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/standing-ovation.html",
            "src": "http://www.spyrius.org/images/nexo-knights/standing-ovation.jpg",
            "title": "453 · Standing Ovation",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/standing-ovation.png",
            "power": [
                "/nexo/img/elements/sun.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/sun-flare.html",
            "src": "http://www.spyrius.org/images/nexo-knights/sun-flare.jpg",
            "title": "454 · Sun Flare",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/sun-flare.png",
            "power": [
                "/nexo/img/elements/sun.png",
                "/nexo/img/elements/fire.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/tic-tac-toe.html",
            "src": "http://www.spyrius.org/images/nexo-knights/tic-tac-toe.jpg",
            "title": "455 · Tic Tac Toe",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/tic-tac-toe.png",
            "power": [
                "/nexo/img/elements/weapon.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/toad.html",
            "src": "http://www.spyrius.org/images/nexo-knights/toad.jpg",
            "title": "457 · Toad",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/toad.png",
            "power": [
                "/nexo/img/elements/paw.png",
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/tooth-buster.html",
            "src": "http://www.spyrius.org/images/nexo-knights/tooth-buster.jpg",
            "title": "458 · Tooth Buster",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/tooth-buster.png",
            "power": [
                "/nexo/img/elements/bomb.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/touchdown.html",
            "src": "http://www.spyrius.org/images/nexo-knights/touchdown.jpg",
            "title": "459 · Touchdown",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/touchdown.png",
            "power": [
                "/nexo/img/elements/armor.png",
                "/nexo/img/elements/sun.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/triple-habanero.html",
            "src": "http://www.spyrius.org/images/nexo-knights/triple-habanero.jpg",
            "title": "460 · Triple Habanero",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/triple-habanero.png",
            "power": [
                "/nexo/img/elements/fork.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/vertigo.html",
            "src": "http://www.spyrius.org/images/nexo-knights/vertigo.jpg",
            "title": "461 · Vertigo",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/vertigo.png",
            "power": [
                "/nexo/img/elements/wind.png",
                "/nexo/img/elements/armor.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/blazing-burn.html",
            "src": "http://www.spyrius.org/images/nexo-knights/blazing-burn.jpg",
            "title": "463 · Blazing Burn",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/blazing-burn.png",
            "power": [
                "/nexo/img/elements/fire.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/malicious-melting.html",
            "src": "http://www.spyrius.org/images/nexo-knights/malicious-melting.jpg",
            "title": "464 · Malicious Melting",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/malicious-melting.png",
            "power": [
                "/nexo/img/elements/water.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/volcanic-vengeance.html",
            "src": "http://www.spyrius.org/images/nexo-knights/volcanic-vengeance.jpg",
            "title": "465 · Volcanic Vengeance",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/volcanic-vengeance.png",
            "power": [
                "/nexo/img/elements/rock.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/kings-rose.html",
            "src": "http://www.spyrius.org/images/nexo-knights/kings-rose.jpg",
            "title": "468 · King's Rose",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/kings-rose.png",
            "power": [
                "/nexo/img/elements/leaf.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/reindeer.html",
            "src": "http://www.spyrius.org/images/nexo-knights/reindeer.jpg",
            "title": "469 · Reindeer",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/reindeer.png",
            "power": [
                "/nexo/img/elements/paw.png",
                "/nexo/img/elements/snow.png"
            ]
        },
        {
            "href": "http://www.spyrius.org/nexo/fighting-frenzy.html",
            "src": "http://www.spyrius.org/images/nexo-knights/fighting-frenzy.jpg",
            "title": "470 · Fighting Frenzy",
            "fullImg": "http://www.spyrius.org/images/nexo-knights/fighting-frenzy.png",
            "power": [
                "/nexo/img/elements/weapon.png",
                "/nexo/img/elements/magic.png"
            ]
        }
    ]
];


const images = [];
for(let shields of heros) {
    for(let shield of shields) {
        images.push(shield.fullImg);
        images.push(shield.src);
        shield.src = shield.src.replace(/.*\//g, '');
        shield.fullImg = shield.fullImg.replace(/.*\//g, '');
    }
}

const ir = new ImageReplacer();

ir.downloadAndReplace(images, 'nexo-shields');

fs.writeFile('nexo-shields.json', JSON.stringify(heros), 'utf8', function() {
    console.log('ok');
});