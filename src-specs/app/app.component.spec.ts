/* >>> boilerplate */
import assert from 'power-assert';
import lodash from 'lodash';
import { inject, async, fakeAsync, tick, addProviders, TestComponentBuilder, ComponentFixture } from '@angular/core/testing';
import { asyncPower, fakeAsyncPower, setTimeoutPromise, elements, elementText } from '../../test-ng2/testing.helper';
/* <<< boilerplate */


////////////////////////////////////////////////////////////////////////
// modules
import { AppComponent } from '../../src/app/app.component';
import { appRouterProviders } from '../../src/app/app.routes';

import { Directive } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs/Rx';


////////////////////////////////////////////////////////////////////////
// mocks
class Mock { }
class MockRouter {
  createUrlTree() { }
}

@Directive({ selector: '[routerLinkActive]' })
class MockRouterLinkActiveDirective { }


////////////////////////////////////////////////////////////////////////
// tests
describe('TEST: App Component', () => {
  /* >>> boilerplate */
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      appRouterProviders, // must be first
      { provide: APP_BASE_HREF, useValue: '/' }, // must be second
      { provide: ActivatedRoute, useClass: Mock },
      { provide: Router, useClass: MockRouter },
    ]);
  });

  beforeEach(inject([TestComponentBuilder], (tcb) => {
    builder = tcb;
  }));
  /* <<< boilerplate */


  it('can create, should have title', fakeAsyncPower(() => {
    const fixture = builder
      .overrideDirective(AppComponent, RouterLinkActive, MockRouterLinkActiveDirective)
      .createFakeAsync(AppComponent);
    tick();
    assert(!!fixture);
    if (fixture) {
      const el = fixture.nativeElement as HTMLElement;
      const component = fixture.componentRef.instance;
      assert(component.title === 'Heroes Editor');
      assert(elementText(el, 'h2') === '');
      fixture.detectChanges();
      assert(elementText(el, 'h2') === 'Heroes Editor');
    }
  }));

});