/*
 * Caesar cipher
 *
 * Copyright (c) 2015 Project Nayuki
 * All rights reserved. Contact Nayuki for licensing.
 * http://www.nayuki.io/page/caesar-cipher-javascript
 */

"use strict";


/*
 * Handles the HTML input/output for Caesar cipher encryption/decryption.
 * This is the one and only entry point function called from the HTML code.
 */
function doCrypt(isDecrypt) {
    let shiftText = document.getElementById("shift").value;
    if (!/^-?\d+$/.test(shiftText)) {
        swal("Key is not an integer");
        return;
    }
    let shift = parseInt(shiftText, 10);
    if (shift < 0 || shift >= 26) {
        alert("Shift is out of range");
        return;

    }
    if (isDecrypt)
        shift = (26 - shift) % 26;
    let textElem = document.getElementById("text");
    textElem.value = caesarShift(textElem.value, shift);
}


/*
 * Returns the result of having each alphabetic letter of the given text string shifted forward
 * by the given amount, with wraparound. Case is preserved, and non-letters are unchanged.
 * Examples:
 *   caesarShift("abz",  0) = "abz"
 *   caesarShift("abz",  1) = "bca"
 *   caesarShift("abz", 25) = "zay"
 *   caesarShift("THe 123 !@#$", 13) = "GUr 123 !@#$"
 */
function caesarShift(text, shift) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let c = text.charCodeAt(i);
        if (c >= 65 && c <= 90) result += String.fromCharCode((c - 65 + shift) % 26 + 65); // Uppercase
        else if (c >= 97 && c <= 122) result += String.fromCharCode((c - 97 + shift) % 26 + 97); // Lowercase
        else result += text.charAt(i); // Copy
    }
    return result;
}
