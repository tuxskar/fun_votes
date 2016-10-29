import random

VOTES = {'Peter': 0,
         'Jon': 0,
         'David': 0,
         'Maria': 0,
         'Salvadora': 0}


def update_some_value():
    """
    Add 1 to some random value in the dict VOTES
    :return: (key, amount) for the key updated
    """
    key = random.choice(list(VOTES.keys()))
    VOTES[key] += random.choice(range(10))
    return {key: VOTES[key]}
