import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { first } from 'rxjs/operators';

import { ApiService } from 'jslib-common/abstractions/api.service';
import { CipherService } from 'jslib-common/abstractions/cipher.service';
import { CryptoService } from 'jslib-common/abstractions/crypto.service';
import { I18nService } from 'jslib-common/abstractions/i18n.service';
import { LogService } from 'jslib-common/abstractions/log.service';
import { PlatformUtilsService } from 'jslib-common/abstractions/platformUtils.service';
import { UserService } from 'jslib-common/abstractions/user.service';

import { AttachmentsComponent as BaseAttachmentsComponent } from 'jslib-angular/components/attachments.component';

@Component({
    selector: 'app-vault-attachments',
    templateUrl: 'attachments.component.html',
})
export class AttachmentsComponent extends BaseAttachmentsComponent {
    openedAttachmentsInPopup: boolean;

    constructor(cipherService: CipherService, i18nService: I18nService,
        cryptoService: CryptoService, userService: UserService,
        platformUtilsService: PlatformUtilsService, apiService: ApiService, private location: Location,
        private route: ActivatedRoute, logService: LogService) {
        super(cipherService, i18nService, cryptoService, userService, platformUtilsService, apiService, window,
            logService);
    }

    async ngOnInit() {
        this.route.queryParams.pipe(first()).subscribe(async params => {
            this.cipherId = params.cipherId;
            await this.init();
        });

        this.openedAttachmentsInPopup = history.length === 1;
    }

    back() {
        this.location.back();
    }

    close() {
        window.close();
    }
}
