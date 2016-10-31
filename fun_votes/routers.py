from channels import route

from fun_votes.consumers import random_votes

channel_routing = [
    # route("websocket.receive", websocket_receive, path=r"^/info/")
    route("websocket.receive", random_votes, path=r"^/info/")
]