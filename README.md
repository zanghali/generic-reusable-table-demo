# Generic reusable table component

DEMO API CODE :

```python
const faker = require('faker');
api.firstName = faker.name.firstName();
api.lastName = faker.name.lastName();
api.email = faker.internet.email();
api.phone = faker.phone.phoneNumber();
api.country = faker.address.country();
api.creationDate = faker.date.past();
```

COMPONENT PROPS :

- cols = [optional] header columns
- data = [required] with table data
- sortable = [optional] flag to enable table sorting
- resizable = [optional] flag to enable columns resizing
- count = [optional] flag to enable counter column

FEATURES :

- Column sorting
- Column resizing
- Lazy loading the whole table (didn't know how to load by chunk)

DEPENDENCIES :

- lodash for camelCase to Capital Case conversion
- enzyme for unit testing
- no library used for sorting/resizing/lazy-loading

ICONS :

Icons made by Smartline and Catalin Fertu from [flaticon](www.flaticon.com)
