// Sample request and response examples for API endpoints

export interface ApiExample {
  requestBody?: any;
  response?: {
    status: number;
    body: any;
  };
  queryParams?: Record<string, string>;
  pathParams?: Record<string, string>;
}

export const API_EXAMPLES: Record<string, ApiExample> = {
  // Users
  "POST /api/v1/users/register": {
    requestBody: {
      firstName: "Kofi",
      lastName: "Annan",
      password: "securePassword123",
      roles: ["user", "MERCHANT"],
      email: "kofi.annan@example.com",
      phoneNumber: "+233241234567",
      country: "Ghana",
      referrerClientId: "MERCH123"
    },
    response: {
      status: 201,
      body: {
        user: {
          _id: "507f1f77bcf86cd799439011",
          id: "507f1f77bcf86cd799439011",
          firstName: "Kofi",
          lastName: "Annan",
          email: "kofi.annan@example.com",
          phoneNumber: "+233241234567",
          country: "Ghana",
          roles: ["user", "MERCHANT"],
          createdAt: "2026-01-26T10:00:00.000Z"
        },
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
  },
  "POST /api/v1/users/login": {
    requestBody: {
      username: "kofi.annan@example.com",
      password: "securePassword123"
    },
    response: {
      status: 200,
      body: {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        user: {
          _id: "507f1f77bcf86cd799439011",
          firstName: "Kofi",
          lastName: "Annan",
          email: "kofi.annan@example.com"
        }
      }
    }
  },
  "GET /api/v1/users/profile": {
    response: {
      status: 200,
      body: {
        _id: "507f1f77bcf86cd799439011",
        firstName: "Kofi",
        lastName: "Annan",
        email: "kofi.annan@example.com",
        phoneNumber: "+233241234567",
        country: "Ghana",
        roles: ["user"],
        points: 1500,
        wallet: {
          balance: 1250.50,
          currency: "GHS"
        }
      }
    }
  },
  "PUT /api/v1/users/profile/update": {
    requestBody: {
      firstName: "Kofi",
      lastName: "Annan",
      email: "kofi.annan@example.com",
      phoneNumber: "+233241234567"
    },
    response: {
      status: 200,
      body: {
        _id: "507f1f77bcf86cd799439011",
        firstName: "Kofi",
        lastName: "Annan",
        email: "kofi.annan@example.com",
        phoneNumber: "+233241234567",
        updatedAt: "2026-01-26T10:00:00.000Z"
      }
    }
  },
  "GET /api/v1/users/phone/{phoneNumber}": {
    pathParams: {
      phoneNumber: "+233241234567"
    },
    response: {
      status: 200,
      body: {
        _id: "507f1f77bcf86cd799439011",
        firstName: "Kofi",
        lastName: "Annan",
        phoneNumber: "+233241234567"
      }
    }
  },
  "POST /api/v1/users/refresh-token": {
    requestBody: {
      refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    },
    response: {
      status: 200,
      body: {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
  },
  "PUT /api/v1/users/change-password": {
    requestBody: {
      currentPassword: "oldPassword123",
      newPassword: "newSecurePassword456"
    },
    response: {
      status: 200,
      body: {
        message: "Password changed successfully"
      }
    }
  },
  "POST /api/v1/users/reset-password": {
    requestBody: {
      email: "kofi.annan@example.com"
    },
    response: {
      status: 200,
      body: {
        message: "Password reset email sent"
      }
    }
  },

  // Airtime
  "POST /api/v1/airtime/topup": {
    requestBody: {
      phoneNumber: "+233241234567",
      amount: 50.00,
      currency: "GHS",
      network: "MTN",
      country: "Ghana"
    },
    response: {
      status: 200,
      body: {
        transactionId: "TXN123456789",
        status: "pending",
        amount: 50.00,
        currency: "GHS",
        phoneNumber: "+233241234567",
        network: "MTN"
      }
    }
  },
  "POST /api/v1/airtime/transtatus": {
    requestBody: {
      transactionId: "TXN123456789"
    },
    response: {
      status: 200,
      body: {
        transactionId: "TXN123456789",
        status: "success",
        amount: 50.00,
        currency: "GHS",
        phoneNumber: "+233241234567",
        completedAt: "2026-01-26T10:05:00.000Z"
      }
    }
  },

  // Internet
  "POST /api/v1/internet/buydata": {
    requestBody: {
      phoneNumber: "+233241234567",
      bundleId: "DATA_1GB_30DAYS",
      network: "MTN",
      country: "Ghana"
    },
    response: {
      status: 200,
      body: {
        transactionId: "TXN987654321",
        status: "pending",
        bundleId: "DATA_1GB_30DAYS",
        phoneNumber: "+233241234567",
        network: "MTN"
      }
    }
  },
  "POST /api/v1/internet/bundlelist": {
    requestBody: {
      country: "Ghana",
      network: "MTN"
    },
    response: {
      status: 200,
      body: {
        bundles: [
          {
            id: "DATA_1GB_30DAYS",
            name: "1GB Data Bundle",
            size: "1GB",
            validity: "30 days",
            price: 15.00,
            currency: "GHS"
          },
          {
            id: "DATA_2GB_30DAYS",
            name: "2GB Data Bundle",
            size: "2GB",
            validity: "30 days",
            price: 25.00,
            currency: "GHS"
          }
        ]
      }
    }
  },

  // Transactions
  "POST /api/v1/transactions/create": {
    requestBody: {
      type: "airtime",
      amount: 50.00,
      currency: "GHS",
      recipientPhone: "+233241234567",
      description: "Airtime top-up"
    },
    response: {
      status: 201,
      body: {
        _id: "507f1f77bcf86cd799439012",
        transactionId: "TXN123456789",
        type: "airtime",
        amount: 50.00,
        currency: "GHS",
        status: "pending",
        recipientPhone: "+233241234567",
        createdAt: "2026-01-26T10:00:00.000Z"
      }
    }
  },
  "GET /api/v1/transactions/{id}": {
    pathParams: {
      id: "507f1f77bcf86cd799439012"
    },
    response: {
      status: 200,
      body: {
        _id: "507f1f77bcf86cd799439012",
        transactionId: "TXN123456789",
        type: "airtime",
        amount: 50.00,
        currency: "GHS",
        status: "success",
        recipientPhone: "+233241234567",
        createdAt: "2026-01-26T10:00:00.000Z",
        completedAt: "2026-01-26T10:05:00.000Z"
      }
    }
  },
  "GET /api/v1/transactions/user/{userId}": {
    pathParams: {
      userId: "507f1f77bcf86cd799439011"
    },
    queryParams: {
      page: "1",
      limit: "10"
    },
    response: {
      status: 200,
      body: {
        transactions: [
          {
            _id: "507f1f77bcf86cd799439012",
            transactionId: "TXN123456789",
            type: "airtime",
            amount: 50.00,
            status: "success"
          }
        ],
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          pages: 1
        }
      }
    }
  },

  // Advansis Money
  "POST /api/v1/advansispay/initiate-payment": {
    requestBody: {
      amount: 100.00,
      currency: "GHS",
      phoneNumber: "+233241234567",
      network: "MTN",
      description: "Payment for services"
    },
    response: {
      status: 200,
      body: {
        token: "PAY_TOKEN_123456",
        paymentUrl: "https://payment.expresspaygh.com/checkout/PAY_TOKEN_123456",
        transactionId: "TXN123456789"
      }
    }
  },
  "POST /api/v1/advansispay/query-transaction": {
    requestBody: {
      token: "PAY_TOKEN_123456"
    },
    response: {
      status: 200,
      body: {
        transactionId: "TXN123456789",
        status: "success",
        amount: 100.00,
        currency: "GHS",
        phoneNumber: "+233241234567",
        completedAt: "2026-01-26T10:05:00.000Z"
      }
    }
  },
  "POST /api/v1/advansispay/debit-wallet": {
    requestBody: {
      amount: 50.00,
      currency: "GHS",
      recipientPhone: "+233241234567",
      description: "Wallet debit"
    },
    response: {
      status: 200,
      body: {
        transactionId: "TXN123456789",
        status: "success",
        amount: 50.00,
        currency: "GHS",
        newBalance: 1200.50
      }
    }
  },

  // Mobile Money
  "POST /api/v1/mobilemoney/send": {
    requestBody: {
      amount: 100.00,
      currency: "GHS",
      recipientPhone: "+233241234567",
      network: "MTN",
      description: "Money transfer"
    },
    response: {
      status: 200,
      body: {
        transactionId: "TXN123456789",
        status: "pending",
        amount: 100.00,
        currency: "GHS",
        recipientPhone: "+233241234567"
      }
    }
  },
  "POST /api/v1/mobilemoney/receive": {
    requestBody: {
      amount: 100.00,
      currency: "GHS",
      senderPhone: "+233241234567",
      network: "MTN"
    },
    response: {
      status: 200,
      body: {
        transactionId: "TXN123456789",
        status: "success",
        amount: 100.00,
        currency: "GHS"
      }
    }
  },

  // Rewards
  "POST /api/v1/rewards": {
    requestBody: {
      userId: "507f1f77bcf86cd799439011",
      points: 100,
      description: "Transaction reward"
    },
    response: {
      status: 201,
      body: {
        _id: "507f1f77bcf86cd799439013",
        userId: "507f1f77bcf86cd799439011",
        points: 100,
        totalPoints: 1600,
        description: "Transaction reward",
        createdAt: "2026-01-26T10:00:00.000Z"
      }
    }
  },
  "GET /api/v1/rewards/{userId}": {
    pathParams: {
      userId: "507f1f77bcf86cd799439011"
    },
    response: {
      status: 200,
      body: {
        _id: "507f1f77bcf86cd799439013",
        userId: "507f1f77bcf86cd799439011",
        totalPoints: 1600,
        rewards: [
          {
            points: 100,
            description: "Transaction reward",
            createdAt: "2026-01-26T10:00:00.000Z"
          }
        ]
      }
    }
  },

  // Notifications
  "POST /api/v1/notifications": {
    requestBody: {
      userId: "507f1f77bcf86cd799439011",
      title: "Transaction Successful",
      message: "Your airtime top-up of GHS 50.00 was successful",
      type: "transaction"
    },
    response: {
      status: 201,
      body: {
        _id: "507f1f77bcf86cd799439014",
        userId: "507f1f77bcf86cd799439011",
        title: "Transaction Successful",
        message: "Your airtime top-up of GHS 50.00 was successful",
        type: "transaction",
        read: false,
        createdAt: "2026-01-26T10:00:00.000Z"
      }
    }
  },
  "GET /api/v1/notifications/{id}": {
    pathParams: {
      id: "507f1f77bcf86cd799439014"
    },
    response: {
      status: 200,
      body: {
        _id: "507f1f77bcf86cd799439014",
        userId: "507f1f77bcf86cd799439011",
        title: "Transaction Successful",
        message: "Your airtime top-up of GHS 50.00 was successful",
        type: "transaction",
        read: false,
        createdAt: "2026-01-26T10:00:00.000Z"
      }
    }
  },

  // Affiliate
  "POST /api/v1/affiliate": {
    requestBody: {
      userId: "507f1f77bcf86cd799439011",
      referralCode: "KOFI123"
    },
    response: {
      status: 201,
      body: {
        _id: "507f1f77bcf86cd799439015",
        userId: "507f1f77bcf86cd799439011",
        referralCode: "KOFI123",
        totalReferrals: 0,
        totalCommission: 0.00,
        createdAt: "2026-01-26T10:00:00.000Z"
      }
    }
  },
  "GET /api/v1/affiliate/{code}": {
    pathParams: {
      code: "KOFI123"
    },
    response: {
      status: 200,
      body: {
        _id: "507f1f77bcf86cd799439015",
        referralCode: "KOFI123",
        totalReferrals: 5,
        totalCommission: 250.00,
        referrals: [
          {
            userId: "507f1f77bcf86cd799439016",
            joinedAt: "2026-01-25T10:00:00.000Z"
          }
        ]
      }
    }
  },
  "GET /api/v1/affiliate/dashboard/summary": {
    response: {
      status: 200,
      body: {
        totalReferrals: 5,
        totalCommission: 250.00,
        pendingCommission: 50.00,
        paidCommission: 200.00,
        recentReferrals: [
          {
            userId: "507f1f77bcf86cd799439016",
            joinedAt: "2026-01-25T10:00:00.000Z"
          }
        ]
      }
    }
  },

  // Reloadly Services
  "GET /api/v1/reloadly/country-list": {
    response: {
      status: 200,
      body: {
        countries: [
          {
            isoName: "GH",
            name: "Ghana",
            currencyCode: "GHS",
            flag: "https://flagcdn.com/w40/gh.png"
          },
          {
            isoName: "NG",
            name: "Nigeria",
            currencyCode: "NGN",
            flag: "https://flagcdn.com/w40/ng.png"
          }
        ]
      }
    }
  },
  "POST /api/v1/reloadly/find-country-by-code": {
    requestBody: {
      countryCode: "GH"
    },
    response: {
      status: 200,
      body: {
        isoName: "GH",
        name: "Ghana",
        currencyCode: "GHS",
        flag: "https://flagcdn.com/w40/gh.png"
      }
    }
  },
  "POST /api/v1/reloadly/network-operators": {
    requestBody: {
      countryCode: "GH",
      page: 1,
      size: 10
    },
    response: {
      status: 200,
      body: {
        operators: [
          {
            operatorId: 1,
            name: "MTN",
            countryCode: "GH",
            currencyCode: "GHS"
          },
          {
            operatorId: 2,
            name: "Vodafone",
            countryCode: "GH",
            currencyCode: "GHS"
          }
        ],
        pagination: {
          page: 1,
          size: 10,
          total: 2
        }
      }
    }
  },
  "POST /api/v1/reloadly/operator/autodetect": {
    requestBody: {
      phoneNumber: "+233241234567",
      countryCode: "GH"
    },
    response: {
      status: 200,
      body: {
        operatorId: 1,
        operatorName: "MTN",
        countryCode: "GH"
      }
    }
  },

  // Reloadly Airtime
  "POST /api/v1/reload-airtime/recharge": {
    requestBody: {
      operatorId: 1,
      amount: 50.00,
      recipientPhone: "+233241234567",
      countryCode: "GH"
    },
    response: {
      status: 200,
      body: {
        transactionId: "TXN123456789",
        status: "pending",
        amount: 50.00,
        currency: "GHS",
        recipientPhone: "+233241234567",
        operator: "MTN"
      }
    }
  },
  "GET /api/v1/reload-airtime/topup-status/{transactionId}": {
    pathParams: {
      transactionId: "TXN123456789"
    },
    response: {
      status: 200,
      body: {
        transactionId: "TXN123456789",
        status: "success",
        amount: 50.00,
        currency: "GHS",
        recipientPhone: "+233241234567",
        operator: "MTN",
        completedAt: "2026-01-26T10:05:00.000Z"
      }
    }
  },

  // Reloadly Data
  "POST /api/v1/reloadly-data/buy-data": {
    requestBody: {
      operatorId: 1,
      dataBundleId: "DATA_1GB_30DAYS",
      recipientPhone: "+233241234567",
      countryCode: "GH"
    },
    response: {
      status: 200,
      body: {
        transactionId: "TXN987654321",
        status: "pending",
        dataBundleId: "DATA_1GB_30DAYS",
        recipientPhone: "+233241234567",
        operator: "MTN"
      }
    }
  },
  "POST /api/v1/reloadly-data/list-operators": {
    requestBody: {
      countryCode: "GH"
    },
    response: {
      status: 200,
      body: {
        operators: [
          {
            operatorId: 1,
            name: "MTN",
            countryCode: "GH",
            dataBundles: [
              {
                id: "DATA_1GB_30DAYS",
                name: "1GB Data Bundle",
                size: "1GB",
                validity: "30 days",
                price: 15.00
              }
            ]
          }
        ]
      }
    }
  },

  // SMS
  "POST /api/v1/sms/sendsms": {
    requestBody: {
      phoneNumber: "+233241234567",
      message: "Hello from LidaPay!",
      senderId: "LIDAPAY"
    },
    response: {
      status: 200,
      body: {
        messageId: "MSG123456789",
        status: "sent",
        phoneNumber: "+233241234567"
      }
    }
  },
  "POST /api/v1/sms/bulk": {
    requestBody: {
      recipients: ["+233241234567", "+233241234568"],
      message: "Hello from LidaPay!",
      senderId: "LIDAPAY"
    },
    response: {
      status: 200,
      body: {
        totalSent: 2,
        messageIds: ["MSG123456789", "MSG123456790"],
        failed: []
      }
    }
  }
};
