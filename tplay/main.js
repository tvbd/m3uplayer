 const channels = [
            { 
                name: "Somoy TV", 
                sources: [
                    { name: "Server 1", url: "https://tplay.live/out/news/somoy-tv/index.m3u8" },
                    { name: "Server 2", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1702/output/index.m3u8" }
                ], 
                img: "https://i.postimg.cc/HsVVr6FH/somoy-tv.png", 
                category: "News",
                description: "Bangladesh"
            },
            { 
                name: "Jamuna Television", 
                sources: [
                    { name: "Server 1", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1701/output/index.m3u8" },
                    { name: "Server 2", url: "https://tplay.live/out/news/jamuna-tv/index.m3u8" }
                ], 
                img: "https://i.postimg.cc/dtR7Gh4t/jamuna-tv.png", 
                category: "News",
                description: "Bangladesh"
            },
            { 
                name: "Independent TV",
                sources: [
                    { name: "Server 1", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1704/output/index.m3u8" },
                    { name: "Server 2", url: "https://tplay.live/out/news/independent-tv/index.m3u8" }
                ], 
                img: "https://i.postimg.cc/3rL7TH81/Independent-TV.png", 
                category: "News",
                description: "Bangladesh"
            },
            { 
                name: "Channel 24",
                sources: [
                    { name: "Server 1", url: "https://ch24cdn.ncare.live/channel24/ch24office/index.m3u8" },
                    { name: "Server 2", url: "https://tplay.live/out/news/channel-24/index.m3u8" },
                    { name: "Server 3", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1703/output/index.m3u8" }
                ], 
                img: "https://i.postimg.cc/QdqkCSFX/channel-24.png", 
                category: "News",
                description: "Bangladesh"
            },
            { 
                name: "News 24",
                sources: [
                    { name: "Server 1", url: "https://tplay.live/out/news/news-24/index.m3u8" }
                ], 
                img: "https://i.postimg.cc/bNJny8Qw/news-24.png", 
                category: "News",
                description: "Bangladesh"
            },
            { 
                name: "Ekattor Television",
                sources: [
                    { name: "Server 1", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1705/output/index.m3u8" },
                    { name: "Server 2", url: "https://tplay.live/out/news/ekattor-tv/index.m3u8" }
                ], 
                img: "https://i.postimg.cc/jjtWwrG9/ekattor-tv.png", 
                category: "News",
                description: "Bangladesh"
            },
            { 
                name: "ATN News",
                sources: [
                    { name: "Server 1", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1706/output/index.m3u8" },
                    { name: "Server 2", url: "https://tplay.live/out/news/atn-news/index.m3u8" }
                ], 
                img: "https://i.postimg.cc/ZRFCxYdp/atn-news.png", 
                category: "News",
                description: "Bangladesh"
            },
            { 
                name: "DBC News",
                sources: [
                    { name: "Server 1", url: "https://tplay.live/bdix/news/dbc-news/index.m3u8" }
                ], 
                img: "https://i.postimg.cc/cJGD5HdQ/dbc.jpg", 
                category: "News",
                description: "Bangladesh"
            },
            { 
                name: "News18 Bangla", 
                sources: [
                    { name: "Server 1", url: "https://n18syndication.akamaized.net/bpk-tv/News18_Bangla_NW18_MOB/output01/index.m3u8" }
                ], 
                img: "https://i.postimg.cc/Dydmbp8n/news18-bangla.png", 
                category: "News",
                description: "India"
            },
            { 
                name: "ABP Ananda", 
                sources: [
                    { name: "Server 1", url: "https://d35j504z0x2vu2.cloudfront.net/v1/master/0bc8e8376bd8417a1b6761138aa41c26c7309312/abp-ananda/master.m3u8" }
                ], 
                img: "https://i.postimg.cc/HjGW7XCJ/abp-ananda.png", 
                category: "News",
                description: "India"
            },
            { 
                name: "Zee 24 Ghanta", 
                sources: [
                    { name: "Server 1", url: "https://tplay.live/bdix/news/zee-24ghanta/index.m3u8" }
                ], 
                img: "https://i.postimg.cc/pdgPSKps/zee-24ghanta.png", 
                category: "News",
                description: "India"
            },
            { 
                name: "WION", 
                sources: [
                    { name: "Server 1", url: "https://tplay.live/bdix/news/wion/index.m3u8" }
                ], 
                img: "https://i.postimg.cc/ZKqXrCqn/wion.jpg", 
                category: "News",
                description: "India"
            },
            { 
                name: "Al Jazeera", 
                sources: [
                    { name: "Server 1", url: "https://live-hls-web-aje-fa.thehlive.com/AJE/index.m3u8" }
                ], 
                img: "https://i.postimg.cc/50TpLNKY/aljazeera.jpg", 
                category: "News",
                description: "Qatar"
            },
            {
                name: "BBC News", 
                sources: [
                    { name: "Server 1", url: "https://tplay.live/out/news/bbc-news/index.m3u8" },
                    { name: "Server 2", url: "https://tplay.live/bdix/news/bbc-news/index.m3u8" }
                ], 
                img: "https://i.postimg.cc/s2679ZP4/bbc.jpg", 
                category: "News",
                description: "London"
            },
            { 
                name: "24/7 Motu Patlu", 
                sources: [
                    { name: "Server 1", url: "https://tplay.live/tplay/playout/209622/master.m3u8" },
                    { name: "Server 2", url: "https://live20.bozztv.com/giatvplayout7/giatv-209622/tracks-v1a1/mono.ts.m3u8" }
                ], 
                img: "https://i.postimg.cc/sgxQd9gz/motu-patlu.jpg", 
                category: "Kids",
                description: "Hindi"
            },
            { 
                name: "24/7 Ninja Hattori", 
                sources: [
                    { name: "Server 1", url: "https://tplay.live/tplay/playout/210448/master.m3u8" },
                    { name: "Server 2", url: "https://live20.bozztv.com/giatvplayout7/giatv-210448/tracks-v1a1/mono.ts.m3u8" }
                ], 
                img: "https://i.postimg.cc/Kz0h2LzX/ninja-hattori.jpg", 
                category: "Kids",
                description: "Hindi"
            },
            { 
                name: "24/7 Doraemon", 
                sources: [
                    { name: "Server 1", url: "https://tplay.live/tplay/playout/209902/master.m3u8" },
                    { name: "Server 2", url: "https://live20.bozztv.com/giatvplayout7/giatv-209902/tracks-v1a1/mono.ts.m3u8" }
                ], 
                img: "https://i.postimg.cc/7hrsjZ1v/doraemon.jpg", 
                category: "Kids",
                description: "Hindi"
            },
            { 
                name: "24/7 Gopal Bhar", 
                sources: [
                    { name: "Server 1", url: "https://tplay.live/tplay/playout/209611/master.m3u8" },
                    { name: "Server 2", url: "https://live20.bozztv.com/giatvplayout7/giatv-209611/tracks-v1a1/mono.ts.m3u8" }
                ], 
                img: "https://i.postimg.cc/Pxj1jp7M/gopal-bhar.jpg", 
                category: "Kids",
                description: "Bengali"
            },
            { 
                name: "24/7 Bantul The Great", 
                sources: [
                    { name: "Server 1", url: "https://tplay.live/tplay/playout/209869/master.m3u8" },
                    { name: "Server 2", url: "https://live20.bozztv.com/giatvplayout7/giatv-209869/tracks-v1a1/mono.ts.m3u8" }
                ], 
                img: "https://i.postimg.cc/X7pGtkJb/bantul.jpg", 
                category: "Kids",
                description: "Bengali"
            },
            { 
                name: "Rongeen TV", 
                sources: [
                    { name: "Server 1", url: "https://cdn-4.pishow.tv/live/1029/master.m3u8" },
                    { name: "Server 2", url: "https://server.thelegitpro.in/rongeentv/rongeentv/index.m3u8" },
                    { name: "Server 3", url: "https://d35j504z0x2vu2.cloudfront.net/v1/manifest/0bc8e8376bd8417a1b6761138aa41c26c7309312/rongeen-tv/669b148c-9bd7-4759-893c-e190dc07060e/0.m3u8" }
                ], 
                img: "https://i.postimg.cc/3RsQQ4G1/rongeentv.jpg", 
                category: "Kids",
                description: "Bengali"
            },
            { 
                name: "CN", 
                sources: [
                    { name: "Server 1", url: "https://live.dinesh29.com.np/stream/jiotvplus/cartoonnetworkhindi/master.m3u8" },
                    { name: "Server 2", url: "https://vodzong.mjunoon.tv:8087/streamtest/cartoon-network-87/playlist.m3u8" },
                    { name: "Server 3", url: "https://livecdn-bostaflix.global.ssl.fastly.net/api/7d6de2fcd0/playlist.m3u8" },
                ], 
                img: "https://i.postimg.cc/d1K0Drvh/Cn.png", 
                category: "Kids",
                description: "India"
            },
            { 
                name: "Disney", 
                sources: [
                    { name: "Server 1", url: "https://web.cwabdtv.eu.org/live/disnepchannel/index.m3u8" },
                    { name: "Server 2", url: "https://live.dinesh29.com.np/stream/jiotvplus/disneychannel/stream_0.m3u8?uid=3705158389" }
                ], 
                img: "https://i.scdn.co/image/ab6761610000e5ebc698d53b77db34027b00f853", 
                category: "Kids",
                description: "United States"
            },
            { 
                name: "Disney Junior", 
                sources: [
                    { name: "Server 1", url: "https://fl6.moveonjoy.com/DISNEY_JR/index.m3u8" }
                ], 
                img: "https://images.seeklogo.com/logo-png/61/1/disney-jr-logo-png_seeklogo-617658.png", 
                category: "Kids",
                description: "United States"
            },
            { 
                name: "Disney XD", 
                sources: [
                    { name: "Server 1", url: "https://fl5.moveonjoy.com/DISNEY_XD/index.m3u8" },
                ], 
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUoDCQJ1KLfTGgQQZvyQkAlWE8qr34Ly1rNA&s", 
                category: "Kids",
                description: "United States"
            },
            { 
                name: "Animax",
                sources: [
                    { name: "Server 1", url: "https://amg02159-kcglobal-amg02159c1-samsung-in-521.playouts.now.amagi.tv/playlist/amg02159-kcglobal-animax-samsungin/playlist.m3u8" },
                ], 
                img: "https://i.postimg.cc/8PQrRLN8/Animax.png", 
                category: "Kids",
                description: "Japan"
            },
            { 
                name: "Zoo Moo",
                sources: [
                    { name: "Server 1", url: "https://cdn.skygo.mn/live/disk1/Zoomoo/HLSv3-FTA/Zoomoo.m3u8" },
                ], 
                img: "https://i.postimg.cc/3J0Thmrb/zoo-moo.jpg", 
                category: "Kids",
                description: "Southeast Asia"
            },
            { 
                name: "9XM", 
                sources: [
                    { name: "Server 1", url: "https://d14c63magvk61v.cloudfront.net/strm/channels/9xm/master.m3u8" },
                    { name: "Server 2", url: "https://tvsen6.aynaott.com/9xm/index.m3u8" }
                ], 
                img: "https://i.postimg.cc/Wb8VmBjp/9xm.jpg", 
                category: "Music",
                description: "India"
            },
            { 
                name: "Mastiii", 
                sources: [
                    { name: "Server 1", url: "https://d35j504z0x2vu2.cloudfront.net/v1/master/0bc8e8376bd8417a1b6761138aa41c26c7309312/mastiii/master.m3u8" },
                    { name: "Server 2", url: "https://tvsen6.aynaott.com/mastimusic/index.m3u8" },
                    { name: "Server 3", url: "https://sablive-ddpb.akamaized.net/mastii/playlist.m3u8" }
                ], 
                img: "https://i.postimg.cc/L4f6PQnh/mastiii.jpg", 
                category: "Music",
                description: "India"
            },
            { 
                name: "B4U Music", 
                sources: [
                    { name: "Server 1", url: "https://cdnb4u.wiseplayout.com/B4U_Music/master.m3u8" },
                    { name: "Server 2", url: "https://d3kdywbtdfbp9z.cloudfront.net/v1/manifest/93ce20f0f52760bf38be911ff4c91ed02aa2fd92/dff423e0-3c82-46d6-9ecb-3baa96b5694a/4598c408-0e38-488c-9b64-fc845d1ea2b6/0.m3u8" },
                    { name: "Server 3", url: "https://tvsen6.aynaott.com/b4umusic/index.m3u8" }
                ], 
                img: "https://i.postimg.cc/mrvFm9CF/B4-U-Music.png", 
                category: "Music",
                description: "India"
            },
            { 
                name: "Bengali Beats", 
                sources: [
                    { name: "Server 1", url: "https://tplay.live/tplay/playout/209587/master.m3u8" },
                    { name: "Server 2", url: "https://live20.bozztv.com/giatvplayout7/giatv-209587/tracks-v1a1/mono.ts.m3u8" }
                ], 
                img: "https://i.postimg.cc/jSLNzXgM/Bengali-Beats.png", 
                category: "Music",
                description: "India"
            },
            { 
                name: "Dhoom Music", 
                sources: [
                    { name: "Server 1", url: "https://cdn-1.pishow.tv/live/1456/master.m3u8" },
                    { name: "Server 2", url: "https://tvsen6.aynaott.com/dhoom/index.m3u8" }
                ], 
                img: "https://i.postimg.cc/QNyf6ZD8/dhoom.jpg", 
                category: "Music",
                description: "India"
            },
            { 
                name: "Sangeet Bangla", 
                sources: [
                    { name: "Server 1", url: "https://cdn-4.pishow.tv/live/1143/master.m3u8" },
                    { name: "Server 2", url: "https://tvsen6.aynaott.com/SangeetBangla/index.m3u8" }
                ], 
                img: "https://i.postimg.cc/NGy2zxLw/sangeet-bangla.jpg", 
                category: "Music",
                description: "India"
            },
            { 
                name: "Sangeet Bhojpuri", 
                sources: [
                    { name: "Server 1", url: "https://cdn-4.pishow.tv/live/1293/master.m3u8" },
                ], 
                img: "https://i.postimg.cc/m2XDKVDy/sangeet-bhojpuri.jpg", 
                category: "Music",
                description: "India"
            },
            { 
                name: "Oxygen Music", 
                sources: [
                    { name: "Server 1", url: "https://tplay.live/tplay/playout/209901/master.m3u8" },
                    { name: "Server 2", url: "https://live20.bozztv.com/giatvplayout7/giatv-209901/tracks-v1a1/mono.ts.m3u8" }
                ], 
                img: "https://i.postimg.cc/8z1kS0G5/Oxygen-Music.jpg", 
                category: "Music",
                description: "Asia"
            },
            { 
                name: "MTV Live", 
                sources: [
                    { name: "Server 1", url: "https://fl3.moveonjoy.com/MTV_LIVE/index.m3u8" }                ], 
                img: "https://i.postimg.cc/8Chwy7HM/mtv-live.jpg", 
                category: "Music",
                description: "USA"
            },
            { 
                name: "MTV U", 
                sources: [
                    { name: "Server 1", url: "https://fl4.moveonjoy.com/MTV_U/index.m3u8" }                ], 
                img: "https://i.postimg.cc/YqsXjK0G/mtv-u.jpg", 
                category: "Music",
                description: "USA"
            },
            { 
                name: "Nick Music", 
                sources: [
                    { name: "Server 1", url: "https://fl3.moveonjoy.com/NICK_MUSIC/index.m3u8" }                ], 
                img: "https://i.postimg.cc/d0dNzHq7/nick-music.jpg", 
                category: "Music",
                description: "USA"
            },
            { 
                name: "California Music", 
                sources: [
                    { name: "Server 1", url: "https://cmc-ono.amagi.tv/hls/amagi_hls_data_cmcAAAAAA-cmc-ono/CDN/640x360_1205600/index.m3u8" }                ], 
                img: "https://i.postimg.cc/tgKdHpry/cmc.jpg", 
                category: "Music",
                description: "USA"
            },
            { 
                name: "Movie Bangla", 
                sources: [
                    { name: "Server 1", url: "https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDDEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFsaWRtaW51aiPhnPTI2/moviebanglalink2.stream/playlist.m3u8" },
                ], 
                img: "https://www.jagobd.com/wp-content/uploads/2016/02/moviebangla.jpg", 
                category: "Movie",
                description: "Bangladesh"
            },
            { 
                name: "Bollywood HD", 
                sources: [
                    { name: "Server 1", url: "https://d35j504z0x2vu2.cloudfront.net/v1/master/0bc8e8376bd8417a1b6761138aa41c26c7309312/bollywood-hd/manifest.m3u8" },
                ], 
                img: "https://i.postimg.cc/xCNC6b26/Bollywood-HD.png", 
                category: "Movie",
                description: "India"
            },
            { 
                name: "Bollywood Classic", 
                sources: [
                    { name: "Server 1", url: "https://d35j504z0x2vu2.cloudfront.net/v1/master/0bc8e8376bd8417a1b6761138aa41c26c7309312/bollywood-classic/manifest.m3u8" },
                ], 
                img: "https://i.postimg.cc/13Sq4MQs/Bollywood-Classic.png", 
                category: "Movie",
                description: "India"
            },
            { 
                name: "Shemaroo Bollywood", 
                sources: [
                    { name: "Server 1", url: "https://d35j504z0x2vu2.cloudfront.net/v1/master/0bc8e8376bd8417a1b6761138aa41c26c7309312/shemaroo-bollywood/master.m3u8" },
                ], 
                img: "https://i.postimg.cc/0NW9N0WT/Shemaroo-Bollywood.png", 
                category: "Movie",
                description: "India"
            },
            { 
                name: "Zee Cinema", 
                sources: [
                    { name: "Server 1", url: "https://amg17931-zee-amg17931c5-samsung-th-5696.playouts.now.amagi.tv/playlist/amg17931-asiatvusaltdfast-zeecinema-samsungth/playlist.m3u8" },
                ], 
                img: "https://i.postimg.cc/SsVLHrkc/z-cinema.jpg", 
                category: "Movie",
                description: "India"
            },
            { 
                name: "Goldmines", 
                sources: [
                    { name: "Server 1", url: "https://cdn-2.pishow.tv/live/1459/master.m3u8" },
                ], 
                img: "https://i.postimg.cc/VLCpyP4j/pishow-1459.jpg", 
                category: "Movie",
                description: "India"
            },
            { 
                name: "Goldmines Movies", 
                sources: [
                    { name: "Server 1", url: "https://cdn-2.pishow.tv/live/1461/master.m3u8" },
                ], 
                img: "https://yt3.googleusercontent.com/d66J-MMZ06-55gkF5maclPGB5f5j1L0SAs3iWnl3lhoswlWrJ67wD2a3mZGkgHgt-W3kMrIT=s900-c-k-c0x00ffffff-no-rj", 
                category: "Movie",
                description: "India"
            },
            { 
                name: "B4U Movies", 
                sources: [
                    { name: "Server 1", url: "https://cdnb4u.wiseplayout.com/B4U_Movies/master.m3u8" },
                    { name: "Server 2", url: "https://amg00877-b4unew-amg00877c2-xiaomi-in-5489.playouts.now.amagi.tv/playlist.m3u8" },
                ], 
                img: "https://i.postimg.cc/tgwF8wQJ/B4-U-Movies.png", 
                category: "Movie",
                description: "India"
            },
            { 
                name: "B4U Kadak", 
                sources: [
                    { name: "Server 1", url: "https://cdnb4u.wiseplayout.com/B4U_Kadak/master.m3u8" },
                    { name: "Server 2", url: "https://amg00877-b4unew-amg00877c4-xiaomi-in-5473.playouts.now.amagi.tv/playlist.m3u8" }
                ], 
                img: "https://i.postimg.cc/zvnwCjQB/B4-U-Kadak.png", 
                category: "Movie",
                description: "India"
            },
            { 
                name: "B4U Bhojpuri", 
                sources: [
                    { name: "Server 1", url: "https://cdnb4u.wiseplayout.com/B4U_Bhojpuri/master.m3u8" },
                ], 
                img: "https://i.postimg.cc/CxJNrcxn/B4-U-Bhojpuri.png", 
                category: "Movie",
                description: "India"
            },
            { 
                name: "Bhojpuri Cinema", 
                sources: [
                    { name: "Server 1", url: "https://live-bhojpuri.akamaized.net/liveabr/playlist.m3u8" },
                    { name: "Server 1", url: "https://cdn-4.pishow.tv/live/1033/master.m3u8" }
                ], 
                img: "https://i.postimg.cc/1z2YMvvc/Bhojpuri-Cinema.png", 
                category: "Movie",
                description: "India"
            },
            { 
                name: "Zee BollyMovies", 
                sources: [
                    { name: "Server 1", url: "https://amg17931-zee-amg17931c8-samsung-th-6526.playouts.now.amagi.tv/playlist.m3u8" },
                ], 
                img: "https://i.postimg.cc/pTPpbML6/zee-bollymovies.jpg", 
                category: "Movie",
                description: "India"
            },
            { 
                name: "& Flix", 
                sources: [
                    { name: "Server 1", url: "https://edge3-moblive.yuppcdn.net/drm/smil:nflixdrm.smil/chunklist_b996000.m3u8" },
                ], 
                img: "https://i.postimg.cc/NfBgbv0y/flix.jpg", 
                category: "Movie",
                description: "India"
            },
            { 
                name: "HBO", 
                sources: [
                    { name: "Server 1", url: "https://fl3.moveonjoy.com/HBO/index.m3u8" },
                ], 
                img: "https://i.postimg.cc/s2gDmN5r/hbo.jpg", 
                category: "Movie",
                description: "US"
            },
            { 
                name: "HBO 2", 
                sources: [
                    { name: "Server 1", url: "https://fl5.moveonjoy.com/HBO_2/index.m3u8" },
                ], 
                img: "https://i.postimg.cc/L8BMr3m8/hbo2.jpg", 
                category: "Movie",
                description: "US"
            },
            { 
                name: "HBO Comedy", 
                sources: [
                    { name: "Server 1", url: "https://fl5.moveonjoy.com/HBO_COMEDY/index.m3u8" },
                ], 
                img: "https://i.postimg.cc/CMNkLWJG/hbo-comedy.jpg", 
                category: "Movie",
                description: "US"
            },
            { 
                name: "HBO Family", 
                sources: [
                    { name: "Server 1", url: "https://fl5.moveonjoy.com/HBO_FAMILY/index.m3u8" },
                ], 
                img: "https://i.postimg.cc/c4Cg16vW/hbo-family.jpg", 
                category: "Movie",
                description: "US"
            },
            { 
                name: "HBO Zone", 
                sources: [
                    { name: "Server 1", url: "https://fl5.moveonjoy.com/HBO_ZONE/index.m3u8" },
                ], 
                img: "https://i.postimg.cc/DzPyPKS5/hbo-zone.jpg", 
                category: "Movie",
                description: "US"
            },
            { 
                name: "Lotus Macau", 
                sources: [
                    { name: "Server 1", url: "https://cdn.skygo.mn/live/disk1/Lotus/HLSv3-FTA/Lotus.m3u8" },
                ], 
                img: "https://i.postimg.cc/6q0JD7ZB/lotus-macau.png", 
                category: "Movie",
                description: "China"
            },
            { 
                name: "Best Action", 
                sources: [
                    { name: "Best-Action", url: "https://streams2.sofast.tv/ptnr-yupptv/title-BEST_ACTION_YUPPTV/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/9a4a5412-ca99-48d3-9013-d1811b95b9d2/manifest.m3u8" },
                    { name: "Best-Thriller", url: "https://streams2.sofast.tv/ptnr-yupptv/title-BEST_THRILLER_YUPPTV/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/ce168a85-c8d4-41d6-a597-cc8fd7baddd9/manifest.m3u8" },
                    { name: "Best-Classics", url: "https://streams2.sofast.tv/ptnr-yupptv/title-BEST_CLASSIC_TV_YUPPTV/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/4f5ab846-bcf0-47aa-b578-70054f98f2f1/manifest.m3u8" },
                    { name: "Best-Drama", url: "https://streams2.sofast.tv/ptnr-yupptv/title-BEST_DRAMA_YUPPTV/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/9800ea5c-2183-4160-9f01-70e5d6428a50/manifest.m3u8" },
                ], 
                img: "https://i.postimg.cc/ncHCB2vs/best-action.png", 
                category: "Movie",
                description: "World"
            },
            { 
                name: "Star Jalsha", 
                sources: [
                    { name: "Server 1", url: "https://tvsen5.aynaott.com/gUX8BJmNc2yF/index.m3u8" },
                    { name: "Server 2", url: "https://live.dinesh29.com.np/stream/jiotvplus/starjalshahd/master.m3u8" },
                ], 
                img: "https://i.postimg.cc/WpQ9PsZ3/star-jalsha.jpg", 
                category: "Entertainment",
                description: "India"
            },
            { 
                name: "Zee Bangla", 
                sources: [
                    { name: "Server 1", url: "https://app.hughag.store/api/154d534216/playlist.m3u8" },
                    { name: "Server 2", url: "https://tvsen6.aynaott.com/ZeeBangla/index.m3u8" },
                    
                ], 
                img: "https://i.postimg.cc/wj9Q6Mj6/zee-bangla.jpg", 
                category: "Entertainment",
                description: "India"
            },
            { 
                name: "Colors Bangla", 
                sources: [
                    { name: "Server 1", url: "https://tvsen5.aynaott.com/u3LkNQ7UHhFX/index.m3u8" },
                    { name: "Server 2", url: "https://live.dinesh29.com.np/stream/jiotvplus/colorsbengalihd/master.m3u8" }
                ], 
                img: "https://i.postimg.cc/vTQZ4Jg6/colors-bangla.jpg", 
                category: "Entertainment",
                description: "India"
            },
            { 
                name: "Sun Bangla", 
                sources: [
                    { name: "Server 1", url: "https://smart.bengaldigital.live/sun-bangla-paid/tracks-v1a1/mono.m3u8" },
                ], 
                img: "https://i.postimg.cc/Yqvwd2HC/sun-bangla.jpg", 
                category: "Entertainment",
                description: "India"
            },
            { 
                name: "Enterr10 Bangla", 
                sources: [
                    { name: "Server 1", url: "https://live-bangla.akamaized.net/liveabr/playlist.m3u8" },
                ], 
                img: "https://i.postimg.cc/50rsyVks/enter10-bangla.jpg", 
                category: "Entertainment",
                description: "India"
            },
            { 
                name: "Ruposhi Bangla", 
                sources: [
                    { name: "Server 1", url: "https://cdn-4.pishow.tv/live/1039/master.m3u8" },
                ], 
                img: "https://i.postimg.cc/8c1LTnTZ/ruposhi-bangla.jpg", 
                category: "Entertainment",
                description: "India"
            },
            { 
                name: "Khushboo Bangla", 
                sources: [
                    { name: "Server 1", url: "https://cdn-4.pishow.tv/live/1473/master.m3u8" },
                ], 
                img: "https://i.postimg.cc/brJdCXyf/khushboo-bangla.jpg", 
                category: "Entertainment",
                description: "India"
            },
            { 
                name: "Akash Aath", 
                sources: [
                    { name: "Server 1", url: "https://cdn-4.pishow.tv/live/969/master.m3u8" },
                ], 
                img: "https://i.postimg.cc/WzkcbSSJ/akash-aath.jpg", 
                category: "Entertainment",
                description: "India"
            },
            { 
                name: "Sony Aath", 
                sources: [
                    { name: "Server 1", url: "https://app.hughag.store/api/b6a720edea/playlist.m3u8" },
                    { name: "Server 2", url: "https://tataplay.slivcdn.com/hls/live/2011641/SonyAathSD/master.m3u8" },
                ], 
                img: "https://i.postimg.cc/y8WtVLd6/sony-aath.jpg", 
                category: "Entertainment",
                description: "India"
            },
            { 
                name: "R Plus Gold", 
                sources: [
                    { name: "Server 1", url: "https://cdn-4.pishow.tv/live/1231/master.m3u8" },
                ], 
                img: "https://i.postimg.cc/JntZ3d11/rplus-gold.jpg", 
                category: "Entertainment",
                description: "India"
            },
            { 
                name: "DD National", 
                sources: [
                    { name: "Server 1", url: "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/40492a64c1db4a1385ba1a397d357d3a/index.m3u8" },
                ], 
                img: "https://i.postimg.cc/PrVcPf1R/DD-National.png", 
                category: "Entertainment",
                description: "India"
            },
            { 
                name: "Dangal", 
                sources: [
                    { name: "Server 1", url: "https://live-dangal.akamaized.net/liveabr/playlist.m3u8" },
                ], 
                img: "https://i.postimg.cc/Hk2rQKsR/Dangal.png", 
                category: "Entertainment",
                description: "India"
            },
            { 
                name: "Dangal 2", 
                sources: [
                    { name: "Server 1", url: "https://live-dangal2.akamaized.net/liveabr/playlist.m3u8" },
                ], 
                img: "https://i.postimg.cc/HWyjSjkQ/Dangal-2.png", 
                category: "Entertainment",
                description: "India"
            },
            { 
                name: "Abzy Dhakad", 
                sources: [
                    { name: "Server 1", url: "https://d2lk5u59tns74c.cloudfront.net/out/v1/4fe6ab07a13543d6bdb2ec63b3e2df44/index.m3u8" },
                ], 
                img: "https://i.postimg.cc/Yq9H0sLb/Abzy-Dhakad.png", 
                category: "Entertainment",
                description: "India"
            },
            { 
                name: "ATN Bangla", 
                sources: [
                    { name: "Server 1", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1722/output/index.m3u8" },
                ], 
                img: "https://www.jagobd.com/wp-content/uploads/2015/12/atn-bangla1.jpg", 
                category: "Mix-Entertainment",
                description: "Bangladesh"
            },
            { 
                name: "Channel i", 
                sources: [
                    { name: "Server 1", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1723/output/index.m3u8" },
                ], 
                img: "https://images.seeklogo.com/logo-png/53/1/channel-i-logo-png_seeklogo-532023.png", 
                category: "Mix-Entertainment",
                description: "Bangladesh"
            },
            { 
                name: "Bollywood Masala", 
                sources: [
                    { name: "Server 1", url: "https://d35j504z0x2vu2.cloudfront.net/v1/master/0bc8e8376bd8417a1b6761138aa41c26c7309312/bollywood-masala/index.m3u8" },
                ], 
                img: "https://i.postimg.cc/d1VDH0pY/Bollywood-Masala.png", 
                category: "Entertainment",
                description: "India"
            },
            { 
                name: "Star Sports", 
                sources: [
                    { name: "Server 1", url: "https://live20.bozztv.com/akamaissh101/ssh101/starsports/chunks.m3u8" },
                    { name: "Server 2", url: "https://crichdplaylist.extratvteam.workers.dev/master.m3u8?cid=star1in" }
                ], 
                img: "https://i.postimg.cc/2j7jpYTD/star-sports.jpg", 
                category: "Sports",
                description: "India"
            },
            { 
                name: "Star Sports Select", 
                sources: [
                    { name: "Server 1", url: "https://tvsen6.aynaott.com/spsel1/index.m3u8" },
                    { name: "Server 2", url: "https://live.dinesh29.com.np/stream/jiotvplus/starsportsselecthd2/master.m3u8" }
                ], 
                img: "https://i.postimg.cc/Y9c27qJp/star-sports-select.png", 
                category: "Sports",
                description: "India"
            },
            { 
                name: "Sony Sports", 
                sources: [
                    { name: "Server 1", url: "https://tataplay.slivcdn.com//hls/live/2011747/TEN1HD/master.m3u8" },
                    { name: "Server 2", url: "https://tataplay.slivcdn.com/hls/live/2020434/TEN2HD/master.m3u8" },
                    { name: "Server 3", url: "https://tataplay.slivcdn.com/hls/live/2020591/TEN3HD/master.m3u8" },
                    { name: "Server 5", url: "https://tataplay.slivcdn.com/hls/live/2020593/SONYSIXHD/master.m3u8" }
                ], 
                img: "https://i.postimg.cc/59rm5cdw/sony-sports.jpg", 
                category: "Sports",
                description: "India"
            },
            { 
                name: "DD Sports", 
                sources: [
                    { name: "Server 1", url: "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/b17adfe543354fdd8d189b110617cddd/index.m3u8" }
                ], 
                img: "https://i.postimg.cc/bJD4gxJg/dd-sports.jpg", 
                category: "Sports",
                description: "Bangladesh"
            },
            { 
                name: "T Sports", 
                sources: [
                    { name: "Server 1", url: "https://tvsen5.aynaott.com/tsports/mono.ts.m3u8" },
                    { name: "Server 2", url: "https://live.tsports.com/mobile_hls/tsports_live_1/playlist.m3u8" },
                    { name: "Server 3", url: "https://live.tsports.com/mobile_hls/tsports_live_2/playlist.m3u8" },
                ], 
                img: "https://i.postimg.cc/DZbVq4jM/t-sports.jpg", 
                category: "Sports",
                description: "Bangladesh"
            },
            { 
                name: "Ten Cricket", 
                sources: [
                    { name: "Server 1", url: "https://edge3-moblive.yuppcdn.net/drm/smil:tencricketdrm.smil/master.m3u8" }
                ], 
                img: "https://i.postimg.cc/C10jYyff/ten-cricket.jpg", 
                category: "Sports",
                description: "India"
            },
            { 
                name: "Animal Planet", 
                sources: [
                    { name: "Server 1", url: "https://vodzong.mjunoon.tv:8087/streamtest/Animal-Planet-158-3/playlist.m3u8" },
                    { name: "Server 2", url: "https://fl6.moveonjoy.com/Animal_Planet/index.m3u8" },
                ], 
                img: "https://i.postimg.cc/RFm9McDx/animal-planet.png", 
                category: "Infotainment",
                description: "World"
            },
            { 
                name: "Discovery", 
                sources: [
                    { name: "Server 1", url: "https://tvsen6.aynaott.com/discovery_hd_bangla/index.m3u8" },
                    { name: "Server 2", url: "https://fl4.moveonjoy.com/Discovery_Channel/index.m3u8" }
                ], 
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSImU3htfX_KbpLD3fqD9Z6tg6gn01iFrROgQ&s", 
                category: "Infotainment",
                description: "World"
            },
            { 
                name: "TLC", 
                sources: [
                    { name: "Server 2", url: "https://fl4.moveonjoy.com/TLC/index.m3u8" }
                ], 
                img: "https://i.postimg.cc/8kqQBDxS/tlc.jpg", 
                category: "Infotainment",
                description: "World"
            },
            { 
                name: "Travelxp", 
                sources: [
                    { name: "Server 1", url: "https://travelxp-travelxp-1-eu.rakuten.wurl.tv/playlist.m3u8" },
                    { name: "Server 2", url: "https://travelxp-travelxp-2-de.xiaomi.wurl.tv/playlist.m3u8" },
                    { name: "Server 3", url: "https://travelxp-travelxp-4-fr.xiaomi.wurl.tv/playlist.m3u8" }
                ], 
                img: "https://i.postimg.cc/zGdP4tPR/travelxp.png", 
                category: "Infotainment",
                description: "World"
            },
            { 
                name: "Peace TV", 
                sources: [
                    { name: "Server 1", url: "https://dzkyvlfyge.erbvr.com/PeaceTvBangla/index.m3u8" },
                ], 
                img: "https://i.postimg.cc/YS396m0h/peacetv-bangla.jpg", 
                category: "Religious",
                description: "World"
            },
            { 
                name: "Madani Channel Bangla", 
                sources: [
                    { name: "Server 1", url: "https://streaming.madanichannel.tv/static/streaming-playlists/hls/d3e49b76-ac06-4689-a641-9200445b647f/master.m3u8" },
                ], 
                img: "https://i.postimg.cc/cHBQ8Hym/madani-bangla.jpg", 
                category: "Religious",
                description: "World"
            },
            { 
                name: "Ilm TV", 
                sources: [
                    { name: "Server 1", url: "https://tplay.live/tplay/playout/209617/master.m3u8" },
                    { name: "Server 2", url: "https://live20.bozztv.com/giatvplayout7/giatv-209617/tracks-v1a1/mono.ts.m3u8" },
                ],
                img: "https://i.postimg.cc/tTkx4MWv/ilm.jpg", 
                category: "Religious",
                description: "World"
            }
            
            
            
            
        ];