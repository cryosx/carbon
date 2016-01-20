Template.rankings.helpers({

});

Template.rankings.events({
    'click #test':function(event,template) {
        console.log('Saving Rankings');

        var treeRecords = TreeCollection.find({userID: Meteor.userId()}, {sort: ['createdDate', 'dsc']}).fetch();

        var d = new Date();
        var CurrentYear = d.getFullYear();
        var Trees=[];
        var FinalCO2 = 0;

        //****fix YearPlanted to work with datePlanted instead of createdDate
        //****fix datePlanted to only take in a certain format for dates entered

        //runs by amount of trees
        for(var i=0; i<treeRecords.length; i++) {
            var YearPlanted = treeRecords[i].createdDate.getFullYear();
            var AccumulatedCO2 = 0; //reset AccumulatedCO2 for Trees[]

            //runs over the course of 85 years from currentYear
            for (var j = 0; j <=85; j++) {
                var YearOfCalculation = j + CurrentYear;
                var TreeDiameter = treeRecords[i].diameter;

                //inches = 1
                //cm = 2
                if (treeRecords[i].diameterUnits == 1) {
                    TreeDiameter=TreeDiameter/0.393701;
                } else {
                    TreeDiameter=TreeDiameter;
                }

                //calculations
                BodyMass = 0.0998 * (Math.pow(TreeDiameter, 2.5445));
                GrowthRate = 0.208 * (Math.pow(BodyMass, 0.763));
                dKdY = (Math.exp(1 - (((GrowthRate * Math.exp(1)) * (YearOfCalculation - YearPlanted)) / BodyMass)) / Math.exp(1)) * (GrowthRate * Math.exp(1));
                dKdYT = dKdY * 1.24;
                Carbon = dKdYT * 0.47;
                CO2 = Carbon * 3.6663;

                //recording data
                AccumulatedCO2 = AccumulatedCO2 + CO2;
                AccumulatedCO2 = Math.round(AccumulatedCO2 * 10) / 10;
                Trees[i] = AccumulatedCO2;
            }
            FinalCO2 = FinalCO2 + AccumulatedCO2;
        }

        //var carbonRecords = CarbonStats.find({userID: Meteor.userId()}).fetch();
        //var carbonRecord = carbonRecords[0];
        //var totalCarbon = carbonRecord.totalCarbon;
        //var footPrint = totalCarbon - FinalCO2;
        var footPrint = -10000;
        var createdDate = new Date();

        var rankNumber = 0;
        var id = Meteor.userId();
        var rankCount = Rankings.find({"userID" : id }).count();

        var rank = {
            'userID': Meteor.userId(),
            'footprint': footPrint,
            'rank': rankNumber,
            'createdDate' : createdDate
        };
        //Rankings.insert(rank);
        //Rankings.update({"userID" : id}, {footprint: -8888});
        var array = [];
        array = Rankings.find({"userID" : id}, {sort: {createdDate: -1}}).fetch();
        console.log(array[0].footprint);



    },
});

Template.rankings.onCreated(function () {
    //add your statement here
});

Template.rankings.onRendered(function () {

    var owl = $(".owl-carousel").owlCarousel({

        autoPlay: 5000, //Set AutoPlay to 3 seconds
        items : 4,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,3]

    });

    $(".next").click(function(){
        owl.trigger('owl.next');
    });
    $(".prev").click(function(){
        owl.trigger('owl.prev');
    });
    $(".play").click(function(){
        owl.trigger('owl.play',5000); //owl.play event accept autoPlay speed as second parameter
    });
    $(".stop").click(function(){
        owl.trigger('owl.stop');
    });
    $("body").keydown(function(e) {
        if(e.keyCode == 37) {
            // left
            owl.trigger('owl.prev');

        }
        else if(e.keyCode == 39) {
            // right
            owl.trigger('owl.next');
        }
    });
    $('.materialboxed').materialbox();
    $(".add").ready(function(){
        var array = [];
        var array2 = [];
        var username;
        var distinctArray = [];
        var distinctValues;

        //make it sort by unique to have one entry per person
        console.log(array = Rankings.find({}, {sort: {footprint: 1}}).fetch());
        console.log(array.length);
        //console.log(array2 = Rankings.find({}, {sort: {userID: 1}, limit: 1}).fetch());
        console.log(array2 = Rankings.find({}, {sort: {userID: 1, createdDate: 1}}).fetch());

        var distinctEntries = _.uniq(Rankings.find({}, {
            sort: {userID: 1}
        }).fetch().map(function(x) {
            return x.footprint;
        }), true);

        console.log(distinctEntries);

        for(var i = 0; i < array.length; i++) {
            username = array[i].userID;
            var content = "<div id=\"rank" + (i+1) + "\" class=\"item\"><img src=\"/parallax/tree" + (i+1) +".jpg\" alt=\"/parallax/treeSample.jpg\"> <p>" + username + ": " + array[i].footprint + "</p></div>";
            owl.data('owl-carousel').addItem(content);
        }

    });
});

Template.rankings.onDestroyed(function () {
    //add your statement here
});

