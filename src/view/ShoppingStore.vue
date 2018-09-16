<template>
  <div class="i-store">
    <div class="container-fullwidth i-store__billboard">
      <img src="https://fakeimg.pl/1500x200/F8F8FA/bbb/?text=/````````````````````````\%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20/````````````````````````\" alt="bg-picture">
      <hgroup class="i-store__billboard__title"><h1>{{ title }}</h1></hgroup>
    </div>
    <div class="container-fluid">
      <div class="i-store__navbar">
        <div class="grid align-middle no-gap-col">
          <div class="col-auto">
            <button>
              <v-icon>fas fa-list-ul</v-icon> 商品分類
            </button>
          </div>
          <div class="col-auto offset-auto d-f">
            <search-bar class="mr-m" url="#"></search-bar>
            <span class="mr-m">
              <label class="i-store__navbar__label">排序依據: </label>
              <select class="i-select">
                <option value="feature">精選項目</option>
                <option value="latest">最新上架</option>
                <option value="price-high">價格-高到低</option>
                <option value="price-low">價格-低到高</option>
              </select>
            </span>
            <span>
              <label class="i-store__navbar__label">每頁顯示: </label>
              <select class="i-select">
                <option value="15">15 個</option>
                <option value="30">30 個</option>
                <option value="45">45 個</option>
              </select>
            </span>
          </div>
        </div>
      </div>
      <div class="grid-12 no-gap">
        <div class="col-2">
          <aside class="i-menu">
            <ul class="i-menu__list">
              <li class="i-menu__item">
                <a href="#" class="i-menu__title">全部商品</a>
              </li>
              <li class="i-menu__item">
                <header class="i-menu__header">
                  <a href="#" class="i-menu__title">音樂專輯</a>
                  <span class="i-menu__header__toggle">
                    <v-icon>fas fa-angle-down</v-icon>
                  </span>
                </header>
                <ul class="i-menu__list is-active">
                  <li class="i-menu__item"><a href="#">搖滾曲風</a></li>
                  <li class="i-menu__item"><a href="#">民謠曲風</a></li>
                  <li class="i-menu__item"><a href="#">古典樂</a></li>
                </ul>
              </li>
              <li class="i-menu__item">
                <header class="i-menu__header">
                  <a href="#" class="i-menu__title">音樂周邊</a>
                  <span class="i-menu__header__toggle">
                    <v-icon>fas fa-angle-down</v-icon>
                  </span>
                </header>
              </li>
            </ul>
          </aside>
        </div>
        <div class="col-10 i-store__content">
          <ul class="grid desktop-3 tablet-3 mobile-2 no-gap">
            <li class="col i-product">
              <a href="/#/product" title="product" class="i-product__link">
                <img src="https://fakeimg.pl/420x420/fff/?text=product&font=lobster" alt="product">
                <span class="i-product__tag i-product__tag--keep-h">活動特價</span>
                <h3 class="i-product__name">商品名稱</h3>
                <span class="i-product__price i-product__price--delete">NT$1,300</span>
                <span class="i-product__discount">NT$1,299</span>
              </a>
            </li>
            <li class="col i-product">
              <a href="#" title="product" class="i-product__link">
                <img src="https://fakeimg.pl/420x420/fff/?text=product&font=lobster" alt="product">
                <span class="i-product__tag i-product__tag--keep-h"></span>
                <h3 class="i-product__name">Tech21 13 吋 Pure Clear 保護殼 (適用於配備 Thunderbolt 3 (USB-C) 的 MacBook Pro)</h3>
                <span class="i-product__price">NT$900</span>
              </a>
            </li>
            <li class="col i-product">
              <a href="#" title="product" class="i-product__link">
                <img src="https://fakeimg.pl/420x420/fff/?text=product&font=lobster" alt="product">
                <span class="i-product__tag i-product__tag--keep-h">新上市</span>
                <h3 class="i-product__name">product name 商品名稱</h3>
                <span class="i-product__price i-product__price--delete">NT$1,300</span>
                <span class="i-product__discount">NT$1,299</span>
              </a>
            </li>
            <li class="col i-product">
              <a href="#" title="product" class="i-product__link">
                <img src="https://fakeimg.pl/420x420/fff/?text=product&font=lobster" alt="product">
                <span class="i-product__tag i-product__tag--keep-h">新上市</span>
                <h3 class="i-product__name">product name 商品名稱</h3>
                <span class="i-product__price">NT$900</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="col-12">
          <div class="grid align-center desktop-4 tablet-3 mobile-1">
            <div class="col">
              <pagination v-model="page" :total="total"></pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingStore',
  data() {
    return {
      title: 'Music Store',
      total: 5,
      page: 5,
    };
  },
};
</script>

<style lang='scss'>
.i-store {
  &__billboard {
    position: relative;

    img {
      width: 100%;
      min-height: 10rem;
      max-height: 15rem;
      filter: blur(3px);
    }

    &__title {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
    }
  }

  &__navbar {
    height: 3.5rem;
    border-bottom: 1px solid $color-line-light;
    padding: 0 $spacing-m;

    &__label {
      font-weight: bold;
      color: $color-text-light;
    }

    .i-search {
      width: 15em;
      height: 1.75em;
    }

    .i-select {
      height: 1.75em;
    }
  }

  .i-menu {
    padding: $spacing-l $spacing-m;
  }

  &__content {
    border-left: 1px solid $color-line-light;
  }

  .i-product {
    padding: $spacing-l $spacing-m;
    border: 0 solid $color-line-light;
    border-bottom-width: 1px;

    &:not(:nth-child(3n)) {
      border-right-width: 1px;
    }
  }

  .c-pagination {
    margin: $spacing 0;
  }
}

// 側邊欄 - 菜單元件
.i-menu {
  &__list {
    & & {
      display: none;
      margin: ($spacing * 0.75) $spacing-s;
    }

    & &.is-active {
      display: block;
    }
  }

  &__item {
    padding-bottom: $spacing-s;
    border-bottom: 1px solid $color-line-light;

    &:not(:last-child) {
      margin-bottom: $spacing-s;
    }

    & & {
      padding: 0;
      border-bottom: 0;
    }

    a {
      display: block;
      color: $color-text;

      &:hover {
        color: $color-primary;
        text-decoration: none;
      }
    }
  }

  &__title {
    font-weight: bold;
  }

  &__header {
    display: flex;
    align-items: center;
    cursor: pointer;

    &__toggle {
      display: flex;
      flex: 1 1 auto;

      .icon {
        width: 1.25em;
        height: 1.25em;
        margin-left: auto;
        border-radius: 50%;
        color: $color-text-light;
      }

      &:hover .icon {
        background-color: $color-bg-light;
        color: $color-text;
      }
    }
  }
}

</style>
