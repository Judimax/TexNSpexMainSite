// angular
import { Injectable } from '@angular/core';

// services
import { UtilityService } from '@core/utility/utility.service';

// rxjs


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    private utilService:UtilityService,
  ) { }


}
