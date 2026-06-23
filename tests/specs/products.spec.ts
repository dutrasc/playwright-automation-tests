import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { ProductsPage } from '../pages/ProductsPage'

test.describe('Products', () => {

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')
    await page.waitForURL('**/inventory.html')
    await page.waitForLoadState('networkidle')
  })

  test('should display products list', async ({ page }) => {
    const productsPage = new ProductsPage(page)
    const products = await productsPage.getProductNames()
    expect(products.length).toBeGreaterThan(0)
  })

  test('should sort products by name Z to A', async ({ page }) => {
    const productsPage = new ProductsPage(page)
    await productsPage.sortBy('za')
    const products = await productsPage.getProductNames()
    expect(products[0]).toBe('Test.allTheThings() T-Shirt (Red)')
  })

  test('should sort products by price low to high', async ({ page }) => {
    const productsPage = new ProductsPage(page)
    await productsPage.sortBy('lohi')
    const prices = await productsPage.getProductPrices()
    expect(prices[0]).toBe('$7.99')
  })

  test('should add product to cart', async ({ page }) => {
    const productsPage = new ProductsPage(page)
    await productsPage.addProductToCart('Sauce Labs Backpack')
    const cartCount = page.locator('.shopping_cart_badge')
    await expect(cartCount).toHaveText('1')
  })

})