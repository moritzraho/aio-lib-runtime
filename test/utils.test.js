/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const ow = require('openwhisk')()
const fs = require('fs')

const utils = require('../src/utils')

beforeEach(() => {
  const json = {
    'file.json': global.fixtureFile('/trigger/parameters.json')
  }
  global.fakeFileSystem.addJson(json)
})

afterEach(() => {
  // reset back to normal
  global.fakeFileSystem.reset()
})

describe('utils has the right functions', () => {
  test('exports', () => {
    expect(typeof utils).toEqual('object')
    expect(typeof utils.createKeyValueArrayFromFile).toEqual('function')
    expect(typeof utils.createKeyValueArrayFromFlag).toEqual('function')
    expect(typeof utils.createKeyValueObjectFromFile).toEqual('function')
    expect(typeof utils.createKeyValueObjectFromFlag).toEqual('function')
    expect(typeof utils.parsePathPattern).toEqual('function')

    expect(typeof utils.createKeyValueObjectFromArray).toEqual('function')
    expect(typeof utils.createKeyValueArrayFromObject).toEqual('function')
    expect(typeof utils.parsePackageName).toEqual('function')
    expect(typeof utils.createComponentsfromSequence).toEqual('function')
    expect(typeof utils.processInputs).toEqual('function')

    expect(typeof utils.createKeyValueInput).toEqual('function')
    expect(typeof utils.setManifestPath).toEqual('function')
    expect(typeof utils.returnUnion).toEqual('function')
    expect(typeof utils.returnDeploymentTriggerInputs).toEqual('function')
    expect(typeof utils.setDeploymentPath).toEqual('function')
    expect(typeof utils.createActionObject).toEqual('function')
    expect(typeof utils.checkWebFlags).toEqual('function')
    expect(typeof utils.createSequenceObject).toEqual('function')
    expect(typeof utils.createApiRoutes).toEqual('function')
    expect(typeof utils.returnAnnotations).toEqual('function')
    expect(typeof utils.deployPackage).toEqual('function')
    expect(typeof utils.undeployPackage).toEqual('function')
    expect(typeof utils.processPackage).toEqual('function')
    expect(typeof utils.setPaths).toEqual('function')
    expect(typeof utils.getProjectEntities).toEqual('function')
    expect(typeof utils.syncProject).toEqual('function')
    expect(typeof utils.findProjectHashonServer).toEqual('function')
    expect(typeof utils.getProjectHash).toEqual('function')
    expect(typeof utils.addManagedProjectAnnotations).toEqual('function')
    expect(typeof utils.printLogs).toEqual('function')
    expect(typeof utils.fileExtensionForKind).toEqual('function')
    expect(typeof utils.kindForFileExtension).toEqual('function')
  })
})

describe('createKeyValueArrayFromObject', () => { /* TODO */ })
describe('parsePackageName', () => { /* TODO */ })
describe('createComponentsfromSequence', () => { /* TODO */ })
describe('processInputs', () => { /* TODO */ })
describe('createKeyValueInput', () => { /* TODO */ })
describe('setManifestPath', () => { /* TODO */ })
describe('returnUnion', () => { /* TODO */ })
describe('returnDeploymentTriggerInputs', () => { /* TODO */ })
describe('setDeploymentPath', () => { /* TODO */ })
describe('createActionObject', () => { /* TODO */ })
describe('checkWebFlags', () => { /* TODO */ })
describe('createSequenceObject', () => { /* TODO */ })
describe('createApiRoutes', () => { /* TODO */ })
describe('returnAnnotations', () => { /* TODO */ })
describe('deployPackage', () => { /* TODO */ })
describe('undeployPackage', () => { /* TODO */ })
describe('processPackage', () => { /* TODO */ })
describe('setPaths', () => { /* TODO */ })
describe('getProjectEntities', () => { /* TODO */ })
describe('syncProject', () => { /* TODO */ })
describe('addManagedProjectAnnotations', () => { /* TODO */ })
describe('printLogs', () => { /* TODO */ })

describe('createKeyValueObjectFromArray', () => {
  test('fail when array item does not have key or value', () => {
    const func = () => utils.createKeyValueObjectFromArray([{}])
    expect(func).toThrow(new Error('Please provide correct input array with key and value params in each array item'))
  })
  test('array of key:value (string) pairs', () => {
    const res = utils.createKeyValueObjectFromArray([{ key: 'key1', value: 'val2' }])
    expect(res).toMatchObject({ key1: 'val2' })
  })
})

describe('createKeyValueArrayFromFlag', () => {
  test('fail when flag length is odd', () => {
    const func = () => utils.createKeyValueArrayFromFlag(['key1'])
    expect(func).toThrow(new Error('Please provide correct values for flags'))
  })
  test('array of key:value (string) pairs', () => {
    const res = utils.createKeyValueArrayFromFlag(['name1', 'val1', 'name2', 'val2'])
    expect(res).toMatchObject([{ key: 'name1', value: 'val1' }, { key: 'name2', value: 'val2' }])
  })
  test('array of key:value (object) pairs', () => {
    const res = utils.createKeyValueArrayFromFlag(['name1', '["val0","val1"]', 'name2', 'val2'])
    expect(typeof res[0].value).toEqual('object')
    expect(res).toMatchObject([{ key: 'name1', value: ['val0', 'val1'] }, { key: 'name2', value: 'val2' }])
  })
})

describe('createKeyValueObjectFromFlag', () => {
  test('fail when flag length is odd', () => {
    const func = () => utils.createKeyValueObjectFromFlag(['key1'])
    expect(func).toThrow(new Error('Please provide correct values for flags'))
  })
  test('array of key:value (string) pairs', () => {
    const res = utils.createKeyValueObjectFromFlag(['name1', 'val1', 'name2', 'val2'])
    expect(res).toMatchObject({ name1: 'val1', name2: 'val2' })
  })
  test('array of key:value (object) pairs', () => {
    const res = utils.createKeyValueObjectFromFlag(['name1', '["val0","val1"]', 'name2', 'val2'])
    expect(typeof res).toEqual('object')
    expect(res).toMatchObject({ name1: ['val0', 'val1'], name2: 'val2' })
  })
})

describe('createKeyValueArrayFromFile', () => {
  test('array of key:value pairs', () => {
    const res = utils.createKeyValueArrayFromFile('/file.json')
    expect(typeof res).toEqual('object')
    expect(res).toMatchObject([{ key: 'param1', value: 'param1value' }, { key: 'param2', value: 'param2value' }])
  })
})

describe('createKeyValueObjectFromFile', () => {
  test('object with key:value pairs', () => {
    const res = utils.createKeyValueObjectFromFile('/file.json')
    expect(typeof res).toEqual('object')
    expect(res).toMatchObject({ param1: 'param1value', param2: 'param2value' })
  })
})

describe('parsePathPattern', () => {
  // expect(Vishal)toWriteThis()
  test('test with namespace and name in path', () => {
    const [, namespace, name] = utils.parsePathPattern('/53444_28782/name1')
    expect(typeof namespace).toEqual('string')
    expect(namespace).toEqual('53444_28782')
    expect(typeof name).toEqual('string')
    expect(name).toEqual('name1')
  })
  test('test with only name in path', () => {
    const [, namespace, name] = utils.parsePathPattern('name1')
    expect(namespace).toEqual(null)
    expect(typeof name).toEqual('string')
    expect(name).toEqual('name1')
  })
})

describe('getProjectHash', () => {
  test('returns hash', () => {
    fs.statSync = jest.fn(() => ({ size: () => 1 }))
    global.fakeFileSystem.addJson({ 'deploy/app.boo': 'fake' })
    const result = utils.getProjectHash('content', 'deploy/app.boo')
    expect(result).toBe('24bfd6809c3d11723ec10681c09a15e886f2b55f')
  })
})

describe('findProjectHashonServer', () => {
  test('return projectHash from packages.list if it finds it', async () => {
    const testProjectName = 'ThisIsTheNameOfTheProject'
    const resultObject = [{ annotations: [{ key: 'whisk-managed', value: { projectName: testProjectName, projectHash: 'projectHash' } }] }]
    const pkgList = ow.mockResolved('packages.list', resultObject)
    const actList = ow.mockResolved('actions.list', '')
    const trgList = ow.mockResolved('triggers.list', '')
    const rlzList = ow.mockResolved('rules.list', '')
    const result = await utils.findProjectHashonServer(ow, testProjectName)
    expect(pkgList).toHaveBeenCalled()
    expect(actList).not.toHaveBeenCalled()
    expect(trgList).not.toHaveBeenCalled()
    expect(rlzList).not.toHaveBeenCalled()
    expect(result).toBe('projectHash')
  })

  test('return projectHash from actions.list if it finds it', async () => {
    const testProjectName = 'ThisIsTheNameOfTheProject'
    const resultObject = [{ annotations: [{ key: 'whisk-managed', value: { projectName: testProjectName, projectHash: 'projectHash' } }] }]
    const pkgList = ow.mockResolved('packages.list', '')
    const actList = ow.mockResolved('actions.list', resultObject)
    const trgList = ow.mockResolved('triggers.list', '')
    const rlzList = ow.mockResolved('rules.list', '')
    const result = await utils.findProjectHashonServer(ow, testProjectName)
    expect(pkgList).toHaveBeenCalled()
    expect(actList).toHaveBeenCalled()
    expect(trgList).not.toHaveBeenCalled()
    expect(rlzList).not.toHaveBeenCalled()
    expect(result).toBe('projectHash')
  })

  test('return projectHash from triggers.list if it finds it', async () => {
    const testProjectName = 'ThisIsTheNameOfTheProject'
    const resultObject = [{ annotations: [{ key: 'whisk-managed', value: { projectName: testProjectName, projectHash: 'projectHash' } }] }]
    const pkgList = ow.mockResolved('packages.list', '')
    const actList = ow.mockResolved('actions.list', '')
    const trgList = ow.mockResolved('triggers.list', resultObject)
    const rlzList = ow.mockResolved('rules.list', '')
    const result = await utils.findProjectHashonServer(ow, testProjectName)
    expect(pkgList).toHaveBeenCalled()
    expect(actList).toHaveBeenCalled()
    expect(trgList).toHaveBeenCalled()
    expect(rlzList).not.toHaveBeenCalled()
    expect(result).toBe('projectHash')
  })

  test('return projectHash from rules.list if it finds it', async () => {
    const testProjectName = 'ThisIsTheNameOfTheProject'
    const resultObject = [{ annotations: [{ key: 'whisk-managed', value: { projectName: testProjectName, projectHash: 'projectHash' } }] }]
    const pkgList = ow.mockResolved('packages.list', '')
    const actList = ow.mockResolved('actions.list', '')
    const trgList = ow.mockResolved('triggers.list', '')
    const rlzList = ow.mockResolved('rules.list', resultObject)
    const result = await utils.findProjectHashonServer(ow, testProjectName)
    expect(pkgList).toHaveBeenCalled()
    expect(actList).toHaveBeenCalled()
    expect(trgList).toHaveBeenCalled()
    expect(rlzList).toHaveBeenCalled()
    expect(result).toBe('projectHash')
  })
})

describe('fileExtensionForKind', () => {
  test('map action kind to file extension', () => {
    expect(utils.fileExtensionForKind('ballerina:abc')).toEqual('.bal')
    expect(utils.fileExtensionForKind('dotnet:abc')).toEqual('.cs')
    expect(utils.fileExtensionForKind('go:abc')).toEqual('.go')
    expect(utils.fileExtensionForKind('java:abc')).toEqual('.java')
    expect(utils.fileExtensionForKind('nodejs:abc')).toEqual('.js')
    expect(utils.fileExtensionForKind('php:abc')).toEqual('.php')
    expect(utils.fileExtensionForKind('python:abc')).toEqual('.py')
    expect(utils.fileExtensionForKind('ruby:abc')).toEqual('.rb')
    expect(utils.fileExtensionForKind('rust:abc')).toEqual('.rs')
    expect(utils.fileExtensionForKind('swift:abc')).toEqual('.swift')

    // all kinds are colon separated but test defensively anyway
    expect(utils.fileExtensionForKind('swift')).toEqual('.swift')

    // unknown kinds return ''
    expect(utils.fileExtensionForKind('???:???')).toEqual('')
    expect(utils.fileExtensionForKind('???')).toEqual('')
    expect(utils.fileExtensionForKind('')).toEqual('')
    expect(utils.fileExtensionForKind(undefined)).toEqual('')
  })
})

describe('kindForFileExtension', () => {
  test('map action kind to file extension', () => {
    expect(utils.kindForFileExtension('f.bal')).toEqual('ballerina:default')
    expect(utils.kindForFileExtension('f.cs')).toEqual('dotnet:default')
    expect(utils.kindForFileExtension('f.go')).toEqual('go:default')
    expect(utils.kindForFileExtension('f.java')).toEqual('java:default')
    expect(utils.kindForFileExtension('f.js')).toEqual('nodejs:default')
    expect(utils.kindForFileExtension('f.php')).toEqual('php:default')
    expect(utils.kindForFileExtension('f.py')).toEqual('python:default')
    expect(utils.kindForFileExtension('f.rb')).toEqual('ruby:default')
    expect(utils.kindForFileExtension('f.rs')).toEqual('rust:default')
    expect(utils.kindForFileExtension('f.swift')).toEqual('swift:default')

    expect(utils.kindForFileExtension(undefined)).toEqual(undefined)
    expect(utils.kindForFileExtension('')).toEqual(undefined)
    expect(utils.kindForFileExtension('.')).toEqual(undefined)
    expect(utils.kindForFileExtension('.js')).toEqual(undefined)
    expect(utils.kindForFileExtension('???')).toEqual(undefined)
  })
})

