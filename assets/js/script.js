(function () {
  const articles = {
    carousel: document.getElementsByClassName('articles-carousel')[0],
    flickity: undefined,
    isTabletAndUp: window.matchMedia('screen and (min-width: 768px)'),
    defaultSettings: {
      cellAlign: 'left',
      draggable: false,
      wrapAround: true,
      arrowShape: '',
      groupCells: 0
    },
    getLastScreenType: function () {
      if (!this.lastScreenType) {
        this.lastScreenType = this.isTabletAndUp.matches ? 'tablet-and-up' : 'phone';
      }

      return this;
    },
    init: function () {
      if (this.flickity) {
        let is_screen_change = true;

        if (this.isTabletAndUp.matches && this.lastScreenType === 'phone') {
          this.defaultSettings.groupCells = 3;
          this.lastScreenType = 'tablet-and-up';
        } 
        else if (!this.isTabletAndUp.matches && this.lastScreenType === 'tablet-and-up') {
          this.defaultSettings.groupCells = 0;
          this.lastScreenType = 'phone';
        } 
        else {
          is_screen_change = false;
        }

        if (is_screen_change) {
          this.flickity.destroy();
          this.flickity = new Flickity (this.carousel, this.defaultSettings);
        }
      }
      else {
        if (this.isTabletAndUp.matches) this.defaultSettings.groupCells = 3;
        this.flickity = new Flickity (this.carousel, this.defaultSettings);
      }
    }
  }
  
  if (articles.carousel) {
    articles.getLastScreenType().init();
    window.addEventListener('resize', () => articles.init());
  }
}());
