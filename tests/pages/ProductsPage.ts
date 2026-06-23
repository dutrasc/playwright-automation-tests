import { Page, Locator } from '@playwright/test'

export class ProductsPage {
  readonly productItems: Locator
  readonly cartIcon: Locator
  readonly sortDropdown: Locator

  constructor(private page: Page) {
    this.productItems = page.locator('.inventory_item')
    this.cartIcon     = page.locator('.shopping_cart_link')
    this.sortDropdown = page.locator('.product_sort_container')
  }

  async addProductToCart(productName: string) {
    await this.page
      .locator('.inventory_item')
      .filter({ hasText: productName })
      .locator('button')
      .click()
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option)
  }

  async getProductNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents()
  }

  async getProductPrices(): Promise<string[]> {
    return this.page.locator('.inventory_item_price').allTextContents()
  }

  async goToCart() {
    await this.cartIcon.click()
  }
}