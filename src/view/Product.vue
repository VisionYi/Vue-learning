<template>
  <div class="container i-pdp">
    <div class="mb-l">
      <div class="grid-12 tablet-filled mobile-1">
        <div class="col-4">
          <div class="i-product i-product--right mb-m">
            <span class="i-product__tag text-b mb-m">活動特價</span>
            <h1 class="i-product__name text-xl mb-m">皮革 Smart Cover - 適用於最新尺寸的平板</h1>
            <span class="i-product__price i-product__price--delete text-m">NT$1,300</span>
            <span class="i-product__discount text-m">NT$1,299</span>
          </div>
          <label class="i-pdp__label mb-s">數量:</label>
          <counter v-model="quantity" :min="1" :max="20"></counter> {{quantity}}
          <span class="i-pdp__stock mb-l">剩餘: 20 個</span>
          <v-btn class="i-pdp__purchase primary">加入購物車</v-btn>
        </div>
        <div class="col-7 offset-1">
          <figure class="i-pdp__gallery">
            <a href="#">
              <img class="i-pdp__gallery__main-img" src="https://fakeimg.pl/800x800/f2f2f2/?text=product&font=lobster" alt="product picture">
            </a>
            <div class="i-pdp__gallery__list">
              <ul class="grid no-gap-col align-center">
                <li class="col-auto">
                  <button>
                    <img src="https://fakeimg.pl/60x60/f2f2f2/?text=product&font=lobster" alt="product pictures">
                  </button>
                </li>
                <li class="col-auto">
                  <button>
                    <img src="https://fakeimg.pl/60x60/f2f2f2/?text=product&font=lobster" alt="product pictures">
                  </button>
                </li>
                <li class="col-auto">
                  <button>
                    <img src="https://fakeimg.pl/60x60/f2f2f2/?text=product&font=lobster" alt="product pictures">
                  </button>
                </li>
                <li class="col-auto">
                  <button>
                    <img src="https://fakeimg.pl/60x60/f2f2f2/?text=product&font=lobster" alt="product pictures">
                  </button>
                </li>
              </ul>
            </div>
          </figure>
        </div>
      </div>
    </div>
    <div class="i-pdp__tabs">
      <v-tabs color="transparent" slider-color="primary" v-model="tabsValue">
        <v-tab>商品內容</v-tab>
        <v-tab>技術規格</v-tab>
      </v-tabs>
    </div>
    <v-tabs-items v-model="tabsValue">
      <v-tab-item>
        <div class="i-pdp__body">
          <h3>商品資訊大標</h3>
          <h4>資訊標題小標</h4>
          <p>專為 Apple Pencil 設計的優美筆套，採用堅韌耐用的皮革精心打造，並有多種顏色選擇可完美搭配你的其他 Apple 配件。這款筆套可在不使用時提供 Apple Pencil 妥善的保護，同時展現優雅之姿，簡約精巧的設計就如同 Apple Pencil 一樣。</p>
          <h4>資訊標題小標</h4>
          <p>專為 Apple Pencil 設計的優美筆套，採用堅韌耐用的皮革精心打造，並有多種顏色選擇</p>
          <p>可完美搭配你的其他 Apple 配件。這款筆套可在不使用時提供 Apple Pencil 妥善的保護，同時展現優雅之姿，簡約精巧的設計就如同 Apple Pencil 一樣。</p>
          <h3>技術規格</h3>
          <ul class="i-list">
            <li class="i-list__item i-list__item--title">【藍牙耳機 AS9(S)】</li>
            <li class="i-list__item">支持配置：A2DP / AVRCP</li>
            <li class="i-list__item">音訊編碼：Fast Stream / SBC</li>
            <li class="i-list__item">最長40小時的音樂時間和20天的待機時間</li>
            <li class="i-list__item">驅動單元：40mm</li>
            <li class="i-list__item">阻    抗：32Ω</li>
            <li class="i-list__item">頻率響應：20Hz-20KHz</li>
            <li class="i-list__item">耳機尺寸：20 x 18 x 8 cm</li>
            <li class="i-list__item">耳機重量：約 200g</li>
            <li class="i-list__item">NCC認證：CCAJ16LP0420T0</li>
          </ul>
          <p>※以上規格資料若有任何錯誤，以原廠所公佈資料為準</p>
        </div>
      </v-tab-item>
      <v-tab-item>
        <div class="i-pdp__body">
          <h3>技術規格</h3>
          <ul class="i-list">
            <li class="i-list__item i-list__item--title">【藍牙耳機 AS9(S)】</li>
            <li class="i-list__item">支持配置：A2DP / AVRCP</li>
            <li class="i-list__item">音訊編碼：Fast Stream / SBC</li>
            <li class="i-list__item">最長40小時的音樂時間和20天的待機時間</li>
            <li class="i-list__item">驅動單元：40mm</li>
            <li class="i-list__item">阻    抗：32Ω</li>
            <li class="i-list__item">頻率響應：20Hz-20KHz</li>
            <li class="i-list__item">耳機尺寸：20 x 18 x 8 cm</li>
            <li class="i-list__item">耳機重量：約 200g</li>
            <li class="i-list__item">NCC認證：CCAJ16LP0420T0</li>
          </ul>
          <p>※以上規格資料若有任何錯誤，以原廠所公佈資料為準</p>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: 'Product',
  data() {
    return {
      tabsValue: '0',
      quantity: 5,
    };
  },
};
</script>

<style lang='scss'>
.i-pdp {
  margin-top: $spacing-xl;

  &__label,
  &__stock {
    display: block;
    color: $color-text-light;
    font-weight: bold;
  }

  .c-counter {
    max-width: 16rem;
  }

  &__purchase.btn {
    width: 100%;
    max-width: 16rem;
  }

  &__gallery {
    text-align: center;

    &__main-img {
      width: 75%;
      margin-bottom: $spacing-m;
    }

    &__list {
      .col-auto:not(:last-child) {
        margin-right: $spacing-m;
      }
    }
  }

  &__tabs {
    border-bottom: 1px solid $color-line-lighter;

    // 直接強制修改 vuetify 元件
    .tabs {
      position: relative;
      top: 1px;

      &__div {
        margin-right: $spacing;
        font-size: $font-size-m;
        color: $color-text;
      }

      &__item:hover {
        opacity: 1;
      }
    }
  }

  &__body {
    padding: $spacing-l $spacing-s;

    h3 {
      font-weight: bold;
      margin-bottom: $spacing-m;

      &:not(:first-child) {
        margin-top: $spacing-l;
      }
    }
    h4 {
      font-size: $font-size;
      line-height: $line-height;
      font-weight: bold;
      margin-bottom: $spacing-s;

      &:not(:first-child) {
        margin-top: $spacing;
      }
    }
    p {
      margin-bottom: $spacing-s;
    }
  }
}

</style>
