import { SubscribeButtonComponent } from '@app/shared/user-subscription/subscribe-button.component'
import { Component, Input, OnInit } from '@angular/core'
import { Account } from '@app/shared/account/account.model'
import { FeedFormat } from '../../../../../shared/models/feeds'

@Component({
  selector: 'my-user-subscribe-button',
  templateUrl: './user-subscribe-button.component.html',
  styleUrls: [ './subscribe-button.component.scss' ]
})
export class UserSubscribeButtonComponent extends SubscribeButtonComponent implements OnInit {

  @Input() account: Account

  get uri () {
    return this.account.name + '@' + this.account.host
  }

  get uriAccount () {
    return this.account.name + '@' + this.account.host
  }

  ngOnInit () {
    console.log(this.account)
    this.subscribed = false
  }

  localSubscribe () {
    this.userSubscriptionService.addSubscription(this.uri)
      .subscribe(
        () => {
          this.subscribed = true

          this.notificationsService.success(
            this.i18n('Subscribed'),
            this.i18n('Subscribed to {{nameWithHost}}', { nameWithHost: this.account.displayName })
          )
        },

        err => this.notificationsService.error(this.i18n('Error'), err.message)
      )
  }

  rssOpen () {
    const rssFeed = this.videoService
      .getAccountFeedUrls(this.account.id)
      .find(i => i.format === FeedFormat.RSS)

    window.open(rssFeed.url)
  }
}
