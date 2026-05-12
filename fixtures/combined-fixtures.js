import { mergeTests } from '@playwright/test'
import {test as apiTest} from '../fixtures/api-fixtures'
import {test as uiTest} from '../fixtures/ui-fixtures'

export const test = mergeTests(apiTest,uiTest)