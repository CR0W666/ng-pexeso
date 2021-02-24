import {Component, HostBinding} from '@angular/core';

import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {
  faApple,
  faApplePay,
  faFacebook,
  faGoogle,
  faGooglePay,
  faInstagram,
  faSpotify,
  faTwitch,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';
import {isNumeric} from 'rxjs/internal-compatibility';

interface ITile {
  icon: IconDefinition;
  visible: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  static readonly icons: IconDefinition[] = [faFacebook, faTwitch, faTwitter, faInstagram, faSpotify, faGoogle, faGooglePay, faApple, faApplePay];
  static readonly maxIcons = AppComponent.icons.length;
  static readonly minIcons = 4;
  @HostBinding() class = 'd-flex bg-light justify-content-center align-items-center';
  @HostBinding() style = {
    width: '100%',
    'min-height': '100vh'
  };
  title = 'ng-pexeso';
  numberOfPairs: number = AppComponent.maxIcons;
  tiles: ITile[];
  flipped?: ITile;

  get gameOn(): boolean {
    return this.tiles !== undefined;
  }

  private get isGameOver(): boolean {
    for (const tile of this.tiles) {
      if (!tile.visible) {
        return false;
      }
    }
    return true;
  }

  // @link https://stackoverflow.com/a/2450976/13833440
  static shuffle<T>(input: Array<T>, times: number = 1): Array<T> {
    const array = [...input]; // clone array
    let currentIndex: number = array.length;
    let temporaryValue: T;
    let randomIndex: number;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return times ? this.shuffle(array, times - 1) : array;
  }

  startGame(): void {
    if (!isNumeric(this.numberOfPairs)) {
      alert('Number of pair is required');
      return;
    }
    if (this.numberOfPairs < AppComponent.minIcons || this.numberOfPairs > AppComponent.maxIcons) {
      alert(`Number of pairs should be between ${AppComponent.minIcons} and ${AppComponent.maxIcons}`);
      return;
    }

    const tiles = [...AppComponent.icons, ...AppComponent.icons].map(icon => {
      return {icon, visible: false};
    });
    this.tiles = AppComponent.shuffle(tiles, 2);
  }

  flip(tile: ITile): void {
    if (tile.visible) {
      return;
    }

    tile.visible = true;
    if (this.flipped) {
      const flipped = this.flipped;
      if (flipped.icon !== tile.icon) {
        setTimeout(() => {
          flipped.visible = false;
          tile.visible = false;
        }, 700);
      } else {
        this.endIfGameOver();
      }
      this.flipped = null;
    } else {
      this.flipped = tile;
    }
  }

  private endIfGameOver(): void {
    if (this.isGameOver) {
      this.tiles = undefined;
    }
  }
}
