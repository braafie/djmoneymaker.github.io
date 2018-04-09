// Dependencies:
// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// https://cdnjs.cloudflare.com/ajax/libs/html5media/1.1.8/html5media.min.js
// https://cdnjs.cloudflare.com/ajax/libs/plyr/2.0.18/plyr.js

jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/TheBeatBangers/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "The Beat Bangers",
                "duration": "27:48",
                "file": "TheBeatBangers"
            }, {
                "track": 2,
                "name": "Slat a beat",
                "duration": "24:47",
                "file": "SlatABeat"
            }, {
                "track": 3,
                "name": "John Legend Love me now",
                "duration": "5:41",
                "file": "johnLegend-LoveMeNo2017"
            }, {
                "track": 4,
                "name": "Justin Bieber Let me love you",
                "duration": "4:59",
                "file": "justinBieber-LetMeLoveYou"
            }, {
                "track": 5,
                "name": "Bruno Mars Versace on the floor",
                "duration": "5:30",
                "file": "brunoMars-VersaceOnTheFloor"
            }, {
                "track": 6,
                "name": "Bruno Mars Thats what I like",
                "duration": "5:37",
                "file": "brunoMars-ThatsWhatLike"
            }, {
                "track": 7,
                "name": "Alessa Cara I'm yours",
                "duration": "6:54",
                "file": "alessiaCara-ImYours"
            }, {
                "track": 8,
                "name": "Charlie Puth Attention",
                "duration": "4:15",
                "file": "charliePuth-Attention"
            }, {
                "track": 9,
                "name": "Jonas Blue Mama",
                "duration": "4:00",
                "file": "jonasBlue-Mama"
            }, {
                "track": 10,
                "name": "Djmoneymaker Hosted By DJ Ralph",
                "duration": "29:54",
                "file": "Djmoneymaker-Sab7feb2k18"
            }, {
                "track": 11,
                "name": "James Arthur Say You Wont Let Go",
                "duration": "5:20",
                "file": "JamesArthur-SayYouWontLetGo"
            }, {
                "track": 12,
                "name": "Radio Nfm  DJ Moneymaker",
                "duration": "41:18",
                "file": "RadioNfm-djmoneymaker"

            }],
            buildPlaylist = $(tracks).each(function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li><div class="plItem"><span class="plNum">' + trackNumber + '.</span><span class="plTitle">' + trackName + '</span><span class="plLength">' + trackDuration + '</span></div></li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});

// initialize plyr
plyr.setup($('#audio1'), {});