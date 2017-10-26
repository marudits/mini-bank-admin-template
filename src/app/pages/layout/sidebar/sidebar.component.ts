import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { AppConfig } from '../../../app.config';

import { getInitial } from '../../../utils/helpers/stringManipulation';
import { getParentUrl } from '../../../utils/helpers/urlManipulation';
declare let jQuery: any;

@Component({
  selector: '[sidebar]',
  templateUrl: './sidebar.template.html'
})

export class Sidebar implements OnInit {
  $el: any;
  config: any;
  router: Router;
  location: Location;

  //CHANGE : CONST or IMPORT
  private sidebarList = [
    { key: 'dashboard', name: 'Dashboard', route: 'dashboard', icon: 'fa fa-desktop'},
    { key: 'bank', name: 'Bank & ATM', route: 'bank', icon: 'fa fa-bank'},
    { key: 'review', name: 'Review', route: 'review', icon: 'fa fa-edit'},
    { key: 'contact', name: 'Contact', route: 'contact', icon: 'fa fa-phone-square'},
    { key: 'customer', name: 'Customer', route: 'customer', icon: 'fa fa-users'}
  ];

  //CHANGE : PARSED via Attr
  private accountInfo = {
    firstName: 'Marudi',
    lastName: 'Tri Subakti',
    lastNameInitial: getInitial('Tri Subakti'),
    totalInfo: 23,
    imgUrl: 'assets/img/people/a5.jpg'
  }

  constructor(config: AppConfig, el: ElementRef, router: Router, location: Location) {
    this.$el = jQuery(el.nativeElement);
    this.config = config.getConfig();
    this.router = router;
    this.location = location;
  }

  initSidebarScroll(): void {
    let $sidebarContent = this.$el.find('.js-sidebar-content');
    if (this.$el.find('.slimScrollDiv').length !== 0) {
      $sidebarContent.slimscroll({
        destroy: true
      });
    }
    $sidebarContent.slimscroll({
      height: window.innerHeight,
      size: '4px'
    });
  }

  changeActiveNavigationItem(location): void {
    let $newActiveLink = this.$el.find('a[href="#' + getParentUrl(location.path()) + '"]');

    // collapse .collapse only if new and old active links belong to different .collapse
    if (!$newActiveLink.is('.active > .collapse > li > a')) {
      this.$el.find('.active .active').closest('.collapse').collapse('hide');
    }
    this.$el.find('.sidebar-nav .active').removeClass('active');

    $newActiveLink.closest('li').addClass('active')
      .parents('li').addClass('active');

    // uncollapse parent
    $newActiveLink.closest('.collapse').addClass('in')
      .siblings('a[data-toggle=collapse]').removeClass('collapsed');
  }

  ngAfterViewInit(): void {
    this.changeActiveNavigationItem(this.location);
  }

  ngOnInit(): void {
    jQuery(window).on('sn:resize', this.initSidebarScroll.bind(this));
    this.initSidebarScroll();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.changeActiveNavigationItem(this.location);
      }
    });
  }
}
