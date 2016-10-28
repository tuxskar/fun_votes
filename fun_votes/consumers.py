import json

from fun_votes.models import update_some_value, VOTES


def websocket_receive(message):
    text = message.content.get('text')
    if text:
        message.reply_channel.send({"text": "You said: {}".format(text)})


def random_votes(message):
    update_some_value()
    message.reply_channel.send(dict(text=json.dumps(VOTES)))
