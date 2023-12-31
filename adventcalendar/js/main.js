(function() {
  window.App = {
    Models : {},
    Collections : {},
    Views : {}
  };

  window.template = function(id) {
    return _.template($('#' + id).html());
  };

  window.vent = _.extend({}, Backbone.Events);

  window.isAdmin = false;

  Array.prototype.shuffle = function() {
    var i = this.length;
    if ( i == 0 ) return false;
    while ( --i ) {
       var j = Math.floor( Math.random() * ( i + 1 ) );
       var tempi = this[i];
       var tempj = this[j];
       this[i] = tempj;
       this[j] = tempi;
     }

     return this;
  }

  /***************************************************
   *
   * Models 
   */
  App.Models.Door = Backbone.Model.extend({
    defaults : {
      number : 0
    }
  });


  /***************************************************
   *
   * Collections 
   */
  App.Collections.Calendar = Backbone.Collection.extend({
    model : App.Models.Door
  });


  /***************************************************
   *
   * Views 
   */

  /**
   * A single door of a Calendar. 
   */
  App.Views.Door = Backbone.View.extend({
    tagName : 'li',
    template : template('doorTemplate'),

    initialize : function() {
      // Transform date
      var date = this.model.get('date');
      date = date.split('.');

      // Set number
      this.model.set('number', parseInt(date[0]));

      // Set date
      date = new Date(parseInt(date[2]), parseInt(date[1]) - 1, parseInt(date[0]));
      this.model.set('date', date);

      // Check if date is old
      var d = new Date();
      d.setDate(d.getDate() - 1);
      
      if (this.model.get('date').getTime() <= d.getTime()) {
        this.$el.addClass('active');
      }
    },

    events : {
      'click' : 'clicked'
    },

    clicked : function() {
      var now = new Date().getTime();

      // Is clickable because it's not time yet
      if (this.model.get('date').getTime() <= now || isAdmin) {
        vent.trigger("doorOpened", {'model' : this.model});
        if (!this.$el.hasClass('active')) {
          this.$el.addClass('active');
        }
      }
    },

    render : function() {
      var template = this.template(this.model.toJSON());
      this.$el.html(template);
      return this;
    }
  }); 

  /**
   * A Calendar holding all doors. 
   */
  App.Views.Calendar = Backbone.View.extend({
    tagName : 'ul',

    initialize : function() {
    },

    render : function() {
      this.collection.each(this.addOne, this);
      return this;
    },

    addOne : function(door) {
      var doorView = new App.Views.Door({model : door});
      this.$el.append(doorView.render().el);
    }
  });

  /**
   * Select a single day. 
   */
  App.Views.Output = Backbone.View.extend({
    el : 'div.output',
    template : template('outputTemplate'),

    initialize : function() {
      vent.bind("doorOpened", this.open, this);
    },

    events : {
      'click .close' : 'close'
    },

    open : function(door) {
      this.$el.addClass('active');
      return this.render(door);
    },

    close : function() {
      this.$el.removeClass('active');
    },

    render : function(door) {
      var template = this.template(door.model.toJSON());
      this.$el.html(template);
      return this;
    }
  });

  /***************************************************
   *
   * Initialize.  
   */

  var data = [
      {
        'date'  : '01.12.2023',
        'title' : 'Welcome',
        'content' : 'https://imagehostscased.neocities.org/Day%201%20border'


      },
      {
        'date'  : '02.12.2023',
        'title':'Helping Santa',
        'content' : 'https://imagehostscased.neocities.org/day2%20Border'
      },
      {
        'date'  : '03.12.2023',
        'title': 'We Found the Sleigh',
        'content' : 'https://imagehostscased.neocities.org/Day%203.png'
      },
      {
        'date'  : '04.12.2023',
        'title':'Frostbite Moulage',
        'content' : 'https://imagehostscased.neocities.org/day_4.png'
      },
      {
        'date'  : '05.12.2023',
        'title':'Make Sure to Check Our Benefits and Discounts During the Festive Period',
        'content' : 'https://scasbenefits.co.uk/benefits__discounts/'
      },
      {
        'date'  : '06.12.2023',
        'title':'Keyboard Shortcut Tricks',
        'content' : 'https://imagehostscased.neocities.org/advent%20sc.png'
      },
      {
        'date'  : '07.12.2023',
        'title':'Eleanor Our SCAS Elf Restocking For Christmas Night ',
        'content' : 'https://imagehostscased.neocities.org/day7'
      },
      {
        'date'  : '08.12.2023',
        'title':'Christmas Flu Moulage',
        'content' : 'https://imagehostscased.neocities.org/day_8.png'
      },
      {
        'date'  : '09.12.2023',
        'title':'Meet The TEL Team',
        'content' : 'https://imagehostscased.neocities.org/tel_relaunch_FINAL%201.pdf'
      },
      {
        'date'  : '10.12.2023',
        'title':'A Christmassy TEL Day',
        'content' : 'https://imagehostscased.neocities.org/day10%20Border'
      },
      {
        'date'  : '11.12.2023',
        'title':'Helping Santa ...Again',
        'content' : 'https://imagehostscased.neocities.org/day11%20Border'
      },
      {
        'date'  : '12.12.2023',
        'title':'Reindeer bite moulage',
        'content' : 'https://imagehostscased.neocities.org/day_12.png'
      },
      {
        'date'  : '13.12.2023',
        'title':'Celebrating Different Cultures',
        'content' : 'https://imagehostscased.neocities.org/Day%2013%20border'
      },
      {
        'date'  : '14.12.2023',
        'title':'Time to Book Some Christmas CPD?',
        'content' : 'https://imagehostscased.neocities.org/day14%20Border'
      },
      {
        'date'  : '15.12.2023',
        'title':'Christmas Chills Hypothermia Moulage ',
        'content' : 'https://imagehostscased.neocities.org/day_15.png'
      },
      {
        'date'  : '16.12.2023',
        'title':'Word Surgery',
        'content' : 'https://imagehostscased.neocities.org/day_16.png'
      },
      {
        'date'  : '17.12.2023',
        'title':'Santa Has Burnt His Feet',
        'content' : 'https://imagehostscased.neocities.org/day_17.png'
      },
      {
        'date'  : '18.12.2023',
        'title':'Helping Santa... Again, Again',
        'content' : 'https://imagehostscased.neocities.org/day18%20Border'
      },
      {
        'date'  : '19.12.2023',
        'title':'Keyboard Shortcut Tricks',
        'content' : 'https://imagehostscased.neocities.org/day_19.png'
      },
      {
        'date'  : '20.12.2023',
        'title':'Keyboard Shortcuts',
        'content' : 'https://imagehostscased.neocities.org/day_20.png'
      },
      {
        'date'  : '21.12.2023',
        'title':'Helpng Santa ...Again, Again, Again',
        'content' : 'https://imagehostscased.neocities.org/day21%20Border'
      },
      {
        'date'  : '22.12.2023',
        'title':'Christmas Last Year',
        'content' : 'https://imagehostscased.neocities.org/day_22.png'
      },
      {
        'date'  : '23.12.2023',
        'title':'SCAS Elves',
        'content' : 'https://imagehostscased.neocities.org/Day%2023.png'
      },
      {
        'date'  : '24.12.2023',
        'title':'Happy Christmas Eve',
        'content' : 'https://imagehostscased.neocities.org/Christmas%20Comp'
      },
      {
        'date'  : '25.12.2023',
        'title':'Happy Christmas',
        'content' : 'https://imagehostscased.neocities.org/day25%20Border'
      },
    ];

    var calendar = new App.Collections.Calendar(data.shuffle());

    var calendarView = new App.Views.Calendar({ collection : calendar });
    $('article.adventcalendar section').append(calendarView.render().el);

    var outputView = new App.Views.Output();  
})();
