variable "aws_region" {
  type        = string
  description = "AWS region to deploy into"
}

variable "instance_type" {
  type        = string
  description = "EC2 instance type"
  default     = "t3.large"
}

variable "ubuntu_ami_owner" {
  type        = string
  description = "AMI owner for Ubuntu"
  default     = "099720109477" # Canonical
}

variable "ubuntu_ami_name_regex" {
  type        = string
  description = "Regex to select Ubuntu AMI"
  default     = "ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"
}

variable "key_name" {
  type        = string
  description = "Existing EC2 Key Pair name to enable SSH"
}

variable "allowed_ssh_cidr" {
  type        = string
  description = "CIDR block allowed to SSH to the instance"
  default     = "0.0.0.0/0"
}

variable "app_dir" {
  type        = string
  description = "Application directory on the EC2 instance where the GitHub Action rsyncs the repo"
  default     = "/home/ubuntu/acmf"
}

variable "ssh_user" {
  type        = string
  description = "Linux user used by GitHub Action for SSH (must exist on the AMI)"
  default     = "ubuntu"
}

variable "root_volume_size_gb" {
  type        = number
  description = "Root volume size for Docker builds"
  default     = 50
}

variable "allocate_eip" {
  type        = bool
  description = "Whether to allocate and associate an Elastic IP so FRONTEND_URLS stays stable"
  default     = true
}

variable "tags" {
  type        = map(string)
  description = "Tags to apply to resources"
  default     = {}
}

