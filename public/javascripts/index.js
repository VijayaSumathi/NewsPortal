function loadlist(){
  // $.ajax call /docs
  $('.userlist').append(['<li>',
  '<h3>India Football Match In Mumbai Sold Out After Sunil Chhetris Heartfelt Plea.</h3>',
  '<img src="image1.png"/>',
  '<p> Sunil Chhetri had made a heartfelt plea to fans on Saturday to go watch India football matches in the stadiums. The India football team captain\'s appeal seems to have done the trick with NDTV sources saying that the Intercontinental Cup match between',
            'India and Kenya at the Mumbai Football Arena on Monday has been sold out. Chhetri, who will be making his 100th international appearance for India, had posted an emotional video on Twitter, pleading with fans to "abuse us, criticise us but',
            'please come to watch the Indian national team play..</p>',
            '<button>Accept</button>',
 '<button>Reject</button>',
'</li>'].join());
}

$(document).ready(loadlist);

