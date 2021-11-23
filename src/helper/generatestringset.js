const randomString = require('randomstring');

module.exports.generate_strings_set = function (number_of_strings, len) {
    const s = new Set();
    const random_string_options = {
        length: len,
        charset: 'alphanumeric'
    }

    while(s.size < number_of_strings) {
        s.add(randomString.generate(random_string_options))
    }
    return s;
}


