// This file is auto-generated by ./bin/rails stimulus:manifest:update
// Run that command whenever you add a new controller or create them with
// ./bin/rails generate stimulus controllerName

import { application } from "./application"

import ChatController from "./chat_controller"
application.register("chat", ChatController)

import HelloController from "./hello_controller"
application.register("hello", HelloController)

import HintController from "./hint_controller"
application.register("hint", HintController)

import NoPositionController from "./no_position_controller"
application.register("no-position", NoPositionController)

import NotificationsController from "./notifications_controller"
application.register("notifications", NotificationsController)

import PopoverController from "./popover_controller"
application.register("popover", PopoverController)

import WrapperController from "./wrapper_controller"
application.register("wrapper", WrapperController)
