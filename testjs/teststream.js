var d = require('../libjs/durable');

d.run({
    a1: {
        r1: {
            when: { $min: 5, $max: 10, $and: [
                { subject: 'approve' },
                { $lte: { amount: 1000 }}
            ]},
            run: requestApproval
        },
    },
    a2: {
        r1: {
            when: { $min: 3, $max: 3,
                a$any: {
                    a: { $and: [{ subject: 'approve' }, { $lte: { amount: 1000 }}]},
                    $s: { $nex: { done: 1 } }
                }
            },
            run: requestApproval
        },
    },
    a3: {
        r1: {
            whenAll: { 
                a: { $min: 5, $max: 5, $and: [{ subject: 'approve' }, { $lte: { amount: 1000 }}]},
                $s: { $nex: { done: 1 } }            
            },
            run: requestApproval
        },
    },
    a4$state: {
        input: {
            request: {
                when: { $min: 5, $max: 10, $and: [{ subject: 'approve' }, { $lte: { amount: 1000 }}]},
                run: requestApproval,
                to: 'pending'
            }
        },
        pending: {
            request: {
                whenAny: {
                    a: { $min: 5, subject: 'approved' },
                    b: { $min: 5, subject: 'ok' }
                },
                run: requestApproval,
                to: 'pending'
            },
            approve: {
                when: { $s: { done: 1 } },
                run: approved,
                to: 'done'
            }
        },
        done: {
        }
    },
    a5$flow: {
        input: {
            to: {
                request: { $min: 5, $and: [{ subject: 'approve' }, { $lte: { amount: 1000 }}]},
            }
        },
        request: {
            run: requestApproval,
            to: {
                approve: { $s: { done: 1} },
                request: {
                    $any: {
                        a: { $min: 5, subject: 'approved' },
                        b: { $min: 5, subject: 'ok'}
                    }
                }
            }
        },
        approve: {
            run: approved
        }
    },

}, '', null, function(host) {
    host.postBatch('a1', [{ id: '0', sid: 1, subject: 'approve', amount: 100 }, 
                                { id: '1', sid: 1, subject: 'approve', amount: 100 },
                                { id: '2', sid: 1, subject: 'approve', amount: 100 },
                                { id: '3', sid: 1, subject: 'approve', amount: 100 },
                                { id: '4', sid: 1, subject: 'approve', amount: 100 }, 
                                { id: '5', sid: 1, subject: 'approve', amount: 100 }, 
                                { id: '6', sid: 1, subject: 'approve', amount: 100 },
                                { id: '7', sid: 1, subject: 'approve', amount: 100 },
                                { id: '8', sid: 1, subject: 'approve', amount: 100 },
                                { id: '9', sid: 1, subject: 'approve', amount: 100 }], 
    function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('ok');
        }
    });

    host.postBatch('a2', [{ id: '0', sid: 2, subject: 'approve', amount: 100 }, 
                                { id: '1', sid: 2, subject: 'approve', amount: 100 },
                                { id: '2', sid: 2, subject: 'approve', amount: 100 },
                                { id: '3', sid: 2, subject: 'approve', amount: 100 },
                                { id: '4', sid: 2, subject: 'approve', amount: 100 }], 
    function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('ok');
        }
    });

    host.postBatch('a2', [{ id: '5', sid: 2, subject: 'approve', amount: 100 }, 
                                { id: '6', sid: 2, subject: 'approve', amount: 100 },
                                { id: '7', sid: 2, subject: 'approve', amount: 100 },
                                { id: '8', sid: 2, subject: 'approve', amount: 100 },
                                { id: '9', sid: 2, subject: 'approve', amount: 100 }], 
    function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('ok');
        }
    });

    host.postBatch('a3', [{ id: '0', sid: 3, subject: 'approve', amount: 100 }, 
                                { id: '1', sid: 3, subject: 'approve', amount: 100 },
                                { id: '2', sid: 3, subject: 'approve', amount: 100 },
                                { id: '3', sid: 3, subject: 'approve', amount: 100 },
                                { id: '4', sid: 3, subject: 'approve', amount: 100 }], 
    function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('ok');
        }
    });

    host.postBatch('a3', [{ id: '5', sid: 3, subject: 'approve', amount: 100 }, 
                                { id: '6', sid: 3, subject: 'approve', amount: 100 },
                                { id: '7', sid: 3, subject: 'approve', amount: 100 },
                                { id: '8', sid: 3, subject: 'approve', amount: 100 },
                                { id: '9', sid: 3, subject: 'approve', amount: 100 }], 
    function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('ok');
        }
    });

    host.postBatch('a4', [{ id: '0', sid: 4, subject: 'approve', amount: 100 }, 
                                { id: '1', sid: 4, subject: 'approve', amount: 100 },
                                { id: '2', sid: 4, subject: 'approve', amount: 100 },
                                { id: '3', sid: 4, subject: 'approve', amount: 100 },
                                { id: '4', sid: 4, subject: 'approve', amount: 100 }], 
    function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('ok');
        }
    });

    host.postBatch('a4', [{ id: '5', sid: 4, subject: 'ok' }, 
                                { id: '6', sid: 4, subject: 'ok' },
                                { id: '7', sid: 4, subject: 'ok' },
                                { id: '8', sid: 4, subject: 'ok' },
                                { id: '9', sid: 4, subject: 'ok' }], 
    function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('ok');
        }
    });

    host.postBatch('a5', [{ id: '0', sid: 5, subject: 'approve', amount: 100 }, 
                                { id: '1', sid: 5, subject: 'approve', amount: 100 },
                                { id: '2', sid: 5, subject: 'approve', amount: 100 },
                                { id: '3', sid: 5, subject: 'approve', amount: 100 },
                                { id: '4', sid: 5, subject: 'approve', amount: 100 }], 
    function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('ok');
        }
    });

    host.postBatch('a5', [{ id: '5', sid: 5, subject: 'approved', amount: 100 }, 
                                { id: '6', sid: 5, subject: 'approved', amount: 100 },
                                { id: '7', sid: 5, subject: 'approved', amount: 100 },
                                { id: '8', sid: 5, subject: 'approved', amount: 100 },
                                { id: '9', sid: 5, subject: 'approved', amount: 100 }], 
    function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('ok');
        }
    });
});

function requestApproval(s) {
    console.log(s.getRulesetName() + ' requestApproval');
    console.log(s.getOutput());
    if (!s.count) {
        s.count = 1;
    } else {
        ++s.count;
    }

    if (s.count == 2) {
        s.done = 1;
    }
}

function approved(s) {
    console.log(s.getRulesetName() + ' approved');
    console.log(s.getOutput());
}
