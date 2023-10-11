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
        'title' : 'title',
        'content' : ''
      },
      {
        'date'  : '02.12.2023',
        'title':'title',
        'content' : 'some content'
      },
      {
        'title':'title',
        'date'  : '03.12.2023',
        'content' : 'some content'
      },
      {
        'date'  : '04.12.2023',
        'title':'title',
        'content' : 'some content'
      },
      {
        'date'  : '05.12.2023',
        'title':'title',
        'content' : 'some content'
      },
      {
        'date'  : '06.12.2023',
        'title':'title',
        'content' : 'some content'
      },
      {
        'date'  : '07.12.2023',
        'title':'title',
        'content' : 'some content'
      },
      {
        'date'  : '8.12.2023',
        'title':'title',
        'content' : 'some content'
      },
      {
        'date'  : '9.12.2023',
        'title':'title',
        'content' : 'some content'
      },
      {
        'date'  : '10.12.2023',
        'title':'title',
        'content' : 'some content'
      },
      {
        'date'  : '11.12.2023',
        'title':'title',
        'content' : 'some content'
      },
      {
        'date'  : '12.12.2023',
        'title':'title',
        'content' : 'some content'
      },
      {
        'date'  : '13.12.2023',
        'title':'title',
        'content' : 'some content'
      },
      {
        'date'  : '14.12.2023',
        'title':'title',
        'content' : 'some content'
      },
      {
        'date'  : '15.12.2023',
        'title':'title',
        'content' : 'some content'
      },
      {
        'date'  : '16.12.2023',
        'title':'title',
        'content' : 'some content'
      },
      {
        'date'  : '17.12.2023',
        'title':'title',
        'content' : 'some content'
      },
      {
        'date'  : '18.12.2023',
        'title':'title',
        'content' : 'some content'
      },
      {
        'date'  : '19.12.2023',
        'title':'title',
        'content' : 'some content'
      },
      {
        'date'  : '20.12.2023',
        'title':'title',
        'content' : 'some content'
      },
      {
        'date'  : '21.12.2023',
        'title':'title',
        'content' : 'some content'
      },
      {
        'date'  : '22.12.2023',
        'title':'title',
        'content' : 'some content'
      },
      {
        'date'  : '23.12.2021',
        'title':'title',
        'content' : 'some content'
      },
      {
        'date'  : '24.12.2021',
        'title':'Happy Christmas Evening',
        'content' : 'img/background_trees.jpg'
      },
      {
        'date'  : '25.12.2021',
        'title':'Happy Christmas',
        'content' : 'https://www.youtube.com/embed/gRWSyqatWQQ?si=C11O5tNMfQ1qhTxO&amp;start=364&end=483'
      },
    ];

    var calendar = new App.Collections.Calendar(data.shuffle());

    var calendarView = new App.Views.Calendar({ collection : calendar });
    $('article.adventcalendar section').append(calendarView.render().el);

    var outputView = new App.Views.Output();  
})();