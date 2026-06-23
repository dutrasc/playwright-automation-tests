import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

test.describe('Login', () => {

  test('should login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(page).toHaveURL(/inventory/)
  })

  test('should show error with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('invalid_user', 'wrong_password')
    const error = await loginPage.getErrorMessage()
    expect(error).toContain('Username and password do not match')
  })

  test('should show error with locked user', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('locked_out_user', 'secret_sauce')
    const error = await loginPage.getErrorMessage()
    expect(error).toContain('Sorry, this user has been locked out')
  })

  test('should show error with empty credentials', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('', '')
    const error = await loginPage.getErrorMessage()
    expect(error).toContain('Username is required')
  })

})