/* global describe, it, expect */

import * as components from '../components'

describe('Common components', () => {
  it('AppIntl should be declared', () => {
    expect(components.AppIntl).toBeTruthy()
  })

  it('ConfirmButton should be declared', () => {
    expect(components.ConfirmButton).toBeTruthy()
  })

  it('EmptyAlert should be declared', () => {
    expect(components.EmptyAlert).toBeTruthy()
  })

  it('ErrorAlert should be declared', () => {
    expect(components.ErrorAlert).toBeTruthy()
  })

  it('FetchErrorAlert should be declared', () => {
    expect(components.FetchErrorAlert).toBeTruthy()
  })

  it('FetchUrlsContainer should be declared', () => {
    expect(components.FetchUrlsContainer).toBeTruthy()
  })

  it('JSONViewer should be declared', () => {
    expect(components.JSONViewer).toBeTruthy()
  })

  it('FullDateTime should be declared', () => {
    expect(components.FullDateTime).toBeTruthy()
  })

  it('HelpMessage should be declared', () => {
    expect(components.HelpMessage).toBeTruthy()
  })

  it('Link components and helpers should be declared', () => {
    expect(components.Link).toBeTruthy()
    expect(components.LinksList).toBeTruthy()
    expect(components.normalizeLinksList).toBeTruthy()
  })

  it('LoadingSpinner should be declared', () => {
    expect(components.LoadingSpinner).toBeTruthy()
  })

  it('MultiSelect should be declared', () => {
    expect(components.MultiSelect).toBeTruthy()
  })

  it('PaginationBar should be declared', () => {
    expect(components.PaginationBar).toBeTruthy()
  })

  it('PaginationContainer should be declared', () => {
    expect(components.PaginationContainer).toBeTruthy()
  })

  it('Portal should be declared', () => {
    expect(components.Portal).toBeTruthy()
  })

  it('RefreshSpinner should be declared', () => {
    expect(components.RefreshSpinner).toBeTruthy()
  })

  it('WarningAlert should be declared', () => {
    expect(components.WarningAlert).toBeTruthy()
  })

  it('IDontExist should not be declared', () => {
    expect(components.IDontExist).toBeFalsy()
  })
})
