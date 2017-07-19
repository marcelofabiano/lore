import Field from 'lore-react-forms/Field';

class BootstrapField extends Field {

  onChange(event) {
    // this.setState({
    //   value: value
    // });
    this.props.onChange(this.props.name, event.target.value);
  }

}

export default BootstrapField;
