const router = require('express').Router()
const contactUsController = require('../controller/contactUsController')
const conectUsController = require('../controller/contactUsController')

router.post(`/create`, conectUsController.createContactus)
router.post(`/sendmail`, contactUsController.sendContactusMail)
router.post(`/sendmailUser`, contactUsController.sendContactusMailuser)

module.exports = router