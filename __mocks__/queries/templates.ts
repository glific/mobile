import { GET_INTERACTIVE_MESSAGES, GET_TEMPLATES } from '../../graphql/queries/Templates';

export const GET_TEMPLATES_MOCK = {
  request: {
    query: GET_TEMPLATES,
    variables: {
      filter: { term: '' },
      opts: { limit: 30, offset: 0, order: 'ASC' },
    },
  },
  result: {
    data: {
      sessionTemplates: [
        {
          MessageMedia: null,
          __typename: 'SessionTemplate',
          body: 'test {{1}} body',
          bspId: 'test-bsp-id',
          id: '1',
          isActive: true,
          isHsm: true,
          isReserved: false,
          label: 'Test Template',
          language: {
            __typename: 'Language',
            id: '1',
            label: 'English',
          },
          numberParameters: 1,
          reason: null,
          shortcode: 'tt',
          status: 'APPROVED',
          translations:
            '{"2":{"uuid":"f01f0874-f04f-45e8-b99a-c7e982c99ac0","status":"APPROVED","number_parameters":1,"language_id":2,"label":"Account Balance","example":" अब आप नीचे दिए विकल्पों में से एक का चयन करके [003] के साथ समाप्त होने वाले खाते के लिए अपना खाता शेष या मिनी स्टेटमेंट देख सकते हैं। | [अकाउंट बैलेंस देखें] | [देखें मिनी स्टेटमेंट]","body":" अब आप नीचे दिए विकल्पों में से एक का चयन करके {{1}} के साथ समाप्त होने वाले खाते के लिए अपना खाता शेष या मिनी स्टेटमेंट देख सकते हैं। | [अकाउंट बैलेंस देखें] | [देखें मिनी स्टेटमेंट]"}}',
          type: 'TEXT',
          updatedAt: '2023-07-03T06:04:12Z',
        },
        {
          MessageMedia: null,
          __typename: 'SessionTemplate',
          body: 'test speed send body',
          bspId: null,
          id: '2',
          isActive: false,
          isHsm: false,
          isReserved: false,
          label: 'Test Speed send',
          language: {
            __typename: 'Language',
            id: '1',
            label: 'English',
          },
          numberParameters: null,
          reason: null,
          shortcode: null,
          status: null,
          translations: '{}',
          type: 'TEXT',
          updatedAt: '2023-07-09T18:55:18Z',
        },
      ],
    },
  },
};

export const GET_INTERACTIVE_MESSAGES_MOCK = {
  request: {
    query: GET_INTERACTIVE_MESSAGES,
    variables: {
      filter: { label: '' },
      opts: { limit: 30, offset: 0, order: 'ASC' },
    },
  },
  result: {
    data: {
      interactiveTemplates: [
        {
          __typename: 'InteractiveTemplate',
          id: '1',
          interactiveContent:
            '{"type":"quick_reply","options":[{"type":"text","title":"YES"},{"type":"text","title":"NO"}],"content":{"type":"text","text":"test interactive message body","header":"Test interactive message"}}',
          label: 'Test interactive message',
          language: {
            __typename: 'Language',
            id: '1',
            label: 'English',
          },
          sendWithTitle: true,
          translations:
            '{"2":{"type":"quick_reply","options":[{"type":"text","title":"हाँ"},{"type":"text","title":"ना"}],"content":{"type":"text","text":"ग्लिफ़िक सभी न नई सुविधाओं के साथ आता है","header":"आप ग्लिफ़िक के लिए कितने उत्साहित हैं?"}},"1":{"type":"quick_reply","options":[{"type":"text","title":"yes"},{"type":"text","title":"no"}],"content":{"type":"text","text":"Glific comes with all new features","header":"Are you excited for *Glific*?"}}}',
          type: 'QUICK_REPLY',
        },
      ],
    },
  },
};

export const completionMock = {
  data: {
    context: {
      types: [
        {
          key_source: 'flow',
          name: 'flow',
          properties: [
            {
              help: 'the name',
              key: '__default__',
              type: 'text',
            },
            {
              help: 'the numeric ID of the flow',
              key: 'id',
              type: 'text',
            },
            {
              help: 'the name of the flow',
              key: 'name',
              type: 'text',
            },
            {
              help: 'the uuid of the flow',
              key: 'uuid',
              type: 'text',
            },
          ],
        },
        {
          key_source: 'calendar',
          name: 'calendar',
          properties: [
            {
              help: 'the name',
              key: '__default__',
              type: 'current_date',
            },
            {
              help: 'the numeric ID of the flow',
              key: 'current_date',
              type: 'text',
            },
            {
              help: 'the name of the flow',
              key: 'yesterday',
              type: 'text',
            },
            {
              help: 'the uuid of the flow',
              key: 'tomorrow',
              type: 'text',
            },
            {
              help: 'name of the day',
              key: 'current_day',
              type: 'text',
            },
            {
              help: 'name of the month',
              key: 'current_month',
              type: 'text',
            },
            {
              help: 'year',
              key: 'current_year',
              type: 'text',
            },
          ],
        },
        {
          key_source: 'fields',
          name: 'fields',
          property_template: {
            help: '{key} for the contact',
            key: '{key}',
            type: 'any',
          },
        },
        {
          key_source: 'results',
          name: 'results',
          property_template: {
            help: 'result for {key}',
            key: '{key}',
            type: 'result',
          },
        },
        {
          name: 'urns',
          properties: [
            {
              help: 'WhatsApp URN for the contact',
              key: 'whatsapp',
              type: 'text',
            },
          ],
        },
        {
          name: 'channel',
          properties: [
            {
              help: 'the name',
              key: '__default__',
              type: 'text',
            },
            {
              help: 'the UUID of the channel',
              key: 'uuid',
              type: 'text',
            },
            {
              help: 'the name of the channel',
              key: 'name',
              type: 'text',
            },
            {
              help: 'the address of the channel',
              key: 'address',
              type: 'text',
            },
          ],
        },
        {
          name: 'contact',
          properties: [
            {
              help: 'the name or URN',
              key: '__default__',
              type: 'text',
            },
            {
              help: 'the numeric ID of the contact',
              key: 'id',
              type: 'text',
            },
            {
              help: 'the name of the contact',
              key: 'name',
              type: 'text',
            },
            {
              help: 'list of profiles associated with the contact',
              key: 'list_profiles',
              type: 'text',
            },
            {
              help: 'the active profile id of the contact',
              key: 'active_profile_id',
              type: 'text',
            },
            {
              help: 'the language of the contact as 3-letter ISO code',
              key: 'language',
              type: 'text',
            },
            {
              help: 'the gender of the contact like male/female/others',
              key: 'gender',
              type: 'text',
            },
            {
              help: 'the custom field values of the contact',
              key: 'fields',
              type: 'fields',
            },
            {
              help: 'contact phone number',
              key: 'phone',
              type: 'text',
            },
            {
              help: 'optin status of contact',
              key: 'optin_status',
              type: 'text',
            },
            {
              help: 'gupshup status; current options are : none, session, session_and_hsm & hsm',
              key: 'bsp_status',
              type: 'text',
            },
            {
              help: 'whatsapp connection status; current options are : processing, valid, invalid, blocked & failed',
              key: 'status',
              type: 'text',
            },
            {
              help: 'contact opted-in time',
              key: 'optin_time',
              type: 'text',
            },
            {
              help: 'contact opted-out time',
              key: 'optout_time',
              type: 'text',
            },
            {
              help: "contact's last inbound message time",
              key: 'last_message_at',
              type: 'text',
            },
            {
              help: 'list of collections contact is member of',
              key: 'in_groups',
              type: 'text',
            },
            {
              help: 'mode of optin',
              key: 'optin_method',
              type: 'text',
            },
          ],
        },
        {
          name: 'flow',
          properties: [
            {
              help: 'the name',
              key: '__default__',
              type: 'text',
            },
            {
              help: 'the UUID of the flow',
              key: 'uuid',
              type: 'text',
            },
            {
              help: 'the name of the flow',
              key: 'name',
              type: 'text',
            },
            {
              help: 'the revision number of the flow',
              key: 'revision',
              type: 'text',
            },
          ],
        },
        {
          name: 'group',
          properties: [
            {
              help: 'the UUID of the group',
              key: 'uuid',
              type: 'text',
            },
            {
              help: 'the name of the group',
              key: 'name',
              type: 'text',
            },
          ],
        },
        {
          name: 'input',
          properties: [
            {
              help: 'the text and attachments',
              key: '__default__',
              type: 'text',
            },
            {
              help: 'the UUID of the input',
              key: 'uuid',
              type: 'text',
            },
            {
              help: 'the creation date of the input',
              key: 'created_on',
              type: 'datetime',
            },
            {
              help: 'the channel that the input was received on',
              key: 'channel',
              type: 'channel',
            },
            {
              help: 'the contact URN that the input was received on',
              key: 'urn',
              type: 'text',
            },
            {
              help: 'the text part of the input',
              key: 'text',
              type: 'text',
            },
            {
              array: true,
              help: 'any attachments on the input',
              key: 'attachments',
              type: 'text',
            },
            {
              help: 'the external ID of the input',
              key: 'external_id',
              type: 'text',
            },
          ],
        },
        {
          name: 'related_run',
          properties: [
            {
              help: 'the contact name and flow UUID',
              key: '__default__',
              type: 'text',
            },
            {
              help: 'the UUID of the run',
              key: 'uuid',
              type: 'text',
            },
            {
              help: 'the contact of the run',
              key: 'contact',
              type: 'contact',
            },
            {
              help: 'the flow of the run',
              key: 'flow',
              type: 'flow',
            },
            {
              help: 'the custom field values of the run',
              key: 'fields',
              type: 'fields',
            },
            {
              help: 'the URN values of the run',
              key: 'urns',
              type: 'urns',
            },
            {
              help: 'the results saved by the run',
              key: 'results',
              type: 'results',
            },
            {
              help: 'the current status of the run',
              key: 'status',
              type: 'text',
            },
          ],
        },
        {
          name: 'result',
          properties: [
            {
              help: 'same as input',
              key: '__default__',
              type: 'text',
            },
            {
              help: 'the category of the result',
              key: 'category',
              type: 'text',
            },
            {
              help: 'the input of the result',
              key: 'input',
              type: 'text',
            },
            {
              help: 'the creation date of the result',
              key: 'inserted_at',
              type: 'datetime',
            },
          ],
        },
        {
          name: 'run',
          properties: [
            {
              help: 'the contact name and flow UUID',
              key: '__default__',
              type: 'text',
            },
            {
              help: 'the UUID of the run',
              key: 'uuid',
              type: 'text',
            },
            {
              help: 'the contact of the run',
              key: 'contact',
              type: 'contact',
            },
            {
              help: 'the flow of the run',
              key: 'flow',
              type: 'flow',
            },
            {
              help: 'the current status of the run',
              key: 'status',
              type: 'text',
            },
            {
              help: 'the results saved by the run',
              key: 'results',
              type: 'results',
            },
            {
              help: 'the creation date of the run',
              key: 'created_on',
              type: 'datetime',
            },
            {
              help: 'the exit date of the run',
              key: 'exited_on',
              type: 'datetime',
            },
          ],
        },
        {
          name: 'trigger',
          properties: [
            {
              help: 'the type of trigger that started this session',
              key: 'type',
              type: 'text',
            },
            {
              help: 'the parameters passed to the trigger',
              key: 'params',
              type: 'any',
            },
          ],
        },
      ],
    },
  },
};

export const fieldsMock = {
  data: {
    results: [
      {
        label: 'Settings 1',
        name: 'Settings 1',
        key: 'settingsss',
        value_type: 'text',
      },
      {
        label: 'Date of Birth',
        name: 'Date of Birth',
        key: 'dob',
        value_type: 'text',
      },
      {
        label: 'Gender',
        name: 'Gender',
        key: 'gender',
        value_type: 'text',
      },
      {
        label: 'Age Group',
        name: 'Age Group',
        key: 'age_group',
        value_type: 'text',
      },
      {
        label: 'Name',
        name: 'Name',
        key: 'name',
        value_type: 'text',
      },
    ],
  },
};
