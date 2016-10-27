import json

from fun_votes.models import get_some_value


def websocket_receive(message):
    text = message.content.get('text')
    if text:
        message.reply_channel.send({"text": "You said: {}".format(text)})


def random_votes(message):
    message.reply_channel.send(dict(text=json.dumps(get_some_value())))
