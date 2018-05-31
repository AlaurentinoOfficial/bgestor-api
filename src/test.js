import * as assert from 'assert'
import * as axios from 'axios'

describe(bold(green('➜  ') + 'Running tests...'), function () {

    it('should return first charachter of the string', function () {
           assert.equal("Hello".charAt(0), 'H')
    })
})